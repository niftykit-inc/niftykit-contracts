// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./interfaces/IDropKitPass.sol";

contract DropKitPass is
    IDropKitPass,
    OwnableUpgradeable,
    AccessControlUpgradeable,
    ERC2981Upgradeable,
    ERC721Upgradeable,
    ERC721EnumerableUpgradeable
{
    using AddressUpgradeable for address;
    using SafeMathUpgradeable for uint256;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.UintSet;
    uint96 private _defaultRateFee;
    address private _treasury;
    string private _tokenBaseURI;
    mapping(uint256 => FeeEntry) private _feeRatesByToken;
    mapping(address => FeeEntry) private _lowestFeeRatesByOwner;
    mapping(address => mapping(uint96 => uint256))
        private _feeRatesCountByOwner;
    mapping(address => EnumerableSetUpgradeable.UintSet)
        private _feeRatesSetByOwner;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        string memory name_,
        string memory symbol_,
        address treasury_,
        address royalty_,
        uint96 royaltyFee_
    ) public initializer {
        __ERC721_init(name_, symbol_);
        __ERC721Enumerable_init();

        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        __Ownable_init();
        __ERC2981_init();

        _treasury = treasury_;
        _setDefaultRoyalty(royalty_, royaltyFee_);

        _defaultRateFee = 500;
    }

    function withdraw() external {
        require(address(this).balance > 0, "0 balance");

        uint256 balance = address(this).balance;
        AddressUpgradeable.sendValue(payable(_treasury), balance);
    }

    function mint(address to, uint96 feeRate)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _mintPass(to, feeRate);
    }

    function batchAirdrop(
        address[] calldata recipients,
        uint96[] calldata feeRates
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(
            recipients.length == feeRates.length,
            "Invalid number of recipients"
        );

        uint256 length = recipients.length;
        for (uint256 i = 0; i < length; i++) {
            _mintPass(recipients[i], feeRates[i]);
        }
    }

    function setTreasury(address newTreasury)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _treasury = newTreasury;
    }

    function setDefaultRoyalty(address receiver, uint96 feeNumerator)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function setDefaultFeeRate(uint96 feeRate)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _defaultRateFee = feeRate;
    }

    function setBaseURI(string memory newBaseURI)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _tokenBaseURI = newBaseURI;
    }

    function treasury() external view returns (address) {
        return _treasury;
    }

    function getFeeRate(uint256 tokenId) public view returns (uint96) {
        require(_feeRatesByToken[tokenId].isValue, "Invalid tokenId");
        return _feeRatesByToken[tokenId].value;
    }

    function getFeeRateOf(address owner) external view returns (uint96) {
        FeeEntry memory ownerRate = _lowestFeeRatesByOwner[owner];
        if (ownerRate.isValue) {
            return ownerRate.value;
        }

        return _defaultRateFee;
    }

    function _mintPass(address to, uint96 feeRate) internal {
        uint256 mintIndex = totalSupply().add(1);
        _feeRatesByToken[mintIndex] = _feeValue(feeRate, true);
        _safeMint(to, mintIndex);
    }

    function _feeValue(uint96 feeRate, bool isValue)
        internal
        pure
        returns (FeeEntry memory)
    {
        return FeeEntry(feeRate, isValue);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _tokenBaseURI;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )
        internal
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        uint96 feeRate = getFeeRate(tokenId);
        FeeEntry memory newOwnerRate = _lowestFeeRatesByOwner[to];

        // if the owner is a new recipient
        if (!newOwnerRate.isValue) {
            _lowestFeeRatesByOwner[to] = _feeValue(feeRate, true);
        }

        // if the recipient is already a holder, and new fee is lower
        if (newOwnerRate.isValue && feeRate < newOwnerRate.value) {
            _lowestFeeRatesByOwner[to].value = feeRate;
        }

        // add new fees to the new owner set
        _feeRatesSetByOwner[to].add(feeRate);

        // update holder count
        unchecked {
            _feeRatesCountByOwner[to][feeRate]++;
            _feeRatesCountByOwner[from][feeRate]--;
        }

        // if the sender no longer holds the fee
        if (_feeRatesCountByOwner[from][feeRate] == 0) {
            // remove fees from set
            _feeRatesSetByOwner[from].remove(feeRate);

            // check if there's other fees held by owner
            uint256 feesCount = _feeRatesSetByOwner[from].length();
            if (feesCount > 0) {
                // find the lowest fee available
                uint96 lowestFee = type(uint96).max;
                for (uint256 i = 0; i < feesCount; ) {
                    unchecked {
                        lowestFee = uint96(
                            MathUpgradeable.min(
                                _feeRatesSetByOwner[from].at(i),
                                lowestFee
                            )
                        );
                        i++;
                    }
                }
                // assign lowest fee by owner
                _lowestFeeRatesByOwner[from].value = lowestFee;
            } else {
                // holder no longer carries any passes
                _lowestFeeRatesByOwner[from] = _feeValue(0, false);
            }
        }

        super._beforeTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(
            ERC721Upgradeable,
            ERC721EnumerableUpgradeable,
            ERC2981Upgradeable,
            AccessControlUpgradeable
        )
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
