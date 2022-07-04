// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
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
    uint96 private constant _defaultRateFee = 500;

    address private _treasury;
    string private _tokenBaseURI;
    mapping(uint256 => uint96) private _feeRates;

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

    function setTreasury(address newTreasury) external onlyOwner {
        _treasury = newTreasury;
    }

    function setDefaultRoyalty(address receiver, uint96 feeNumerator)
        external
        onlyOwner
    {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _tokenBaseURI = newBaseURI;
    }

    function treasury() external view returns (address) {
        return _treasury;
    }

    function getFeeRate(uint256 tokenId) external view returns (uint96) {
        require(tokenId > 0, "Invalid tokenId");
        require(tokenId <= totalSupply(), "Invalid tokenId");
        return _feeRates[tokenId];
    }

    function getFeeRateOf(address owner) external view returns (uint96) {
        uint256 tokensCount = balanceOf(owner);
        if (tokensCount == 0) {
            return _defaultRateFee;
        }
        uint96 minFee = _feeRates[tokenOfOwnerByIndex(owner, 0)];
        for (uint256 i = 1; i < tokensCount; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            uint96 feeRate = _feeRates[tokenId];
            if (feeRate < minFee) {
                minFee = feeRate;
            }
        }
        return minFee;
    }

    function _mintPass(address to, uint96 feeRate) internal {
        uint256 mintIndex = totalSupply().add(1);
        _feeRates[mintIndex] = feeRate;
        _safeMint(to, mintIndex);
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
