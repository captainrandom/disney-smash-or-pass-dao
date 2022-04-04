pragma solidity ^0.8.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import 'base64-sol/base64.sol';

contract OwnableDelegateProxy {}

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

contract DisneySmashOrPass is ERC1155, Ownable {

    using Strings for uint256;

    uint256 immutable MAX_TOKEN_ID;

    mapping(uint256 => bool) existsByTokenId;
    address proxyRegistryAddress;

    event Receive(address indexed sender, uint256 indexed tokenId);

    constructor(
        address _proxyRegistryAddress,
        string memory _base_uri,
        uint256 _max_token_id
    ) ERC1155(_base_uri) {
        proxyRegistryAddress = _proxyRegistryAddress;
        MAX_TOKEN_ID = _max_token_id;
    }

    function mintItem(uint256 id)
    public
    payable
    returns (uint256)
    {
        _mint(msg.sender, id, 1, "");
        if(!existsByTokenId[id]) { existsByTokenId[id] = true; }
        emit Receive(msg.sender, id);
        return id;
    }

    // TODO: add mint batch

    function setBaseUri(string memory baseUri) onlyOwner external {
        _setURI(baseUri);
    }

    function tokenExists(uint256 id) public view returns (bool) {
        return existsByTokenId[id];
    }

    function uri(uint256 id) public view override returns (string memory) {
        require(existsByTokenId[id], "not exist");
        // need to make sure that the id is a hex val
        string memory name = string(abi.encodePacked('DSP #', id.toString()));

        return
        string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"',
                            name,
                            '", "description":"',"A slideshow of disney characters that you would smash.",
                            '", "external_url":"https://oe40.me", "attributes": ',
                            getAttributesForToken(id),
                            '", "animation_ur": "',
                            'https://gateway.pinata.cloud/ipfs/QmUi6PqRnQKAN6cYpqFTUeEr8F3UXT2p35W8MPBDwCWUnH/index.html?tokenId=',
                            id,
                            '"}'
                        )
                    )
                )
            )
        );
    }

    function getAttributesForToken(uint256 id) internal view returns (string memory) {
        return string(abi.encodePacked(
                '[{"trait_type": "Num Characters", "value": ',
                    getNumCharacters(id),
                '}, {"trait_type": "Num Men", "value": "',
                    getNumMenCharacters(id),
                '"}, {"trait_type": "Num Women", "value": "',
                    getNumWomenCharacters(id),
                '"}],'
            ));
    }

    // TODO: come back to these
    function getNumCharacters(uint256 id) internal pure returns (uint256) {
        return 0;
    }

    // TODO: come back to these
    function getNumMenCharacters(uint256 id) internal pure returns (uint256) {
        return 0;
    }

    // TODO: come back to these
    function getNumWomenCharacters(uint256 id) internal pure returns (uint256) {
        return 0;
    }
}
