// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract godToken is ERC721, Ownable {
  constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol)
  {}

  uint256 counter;

  uint256 fee = 0.001 ether;

  struct god {
    string name;
    uint256 id;
    uint256 dna;
    uint8 level;
    uint8 rarity;
    uint8 attack;
    uint defense;
    uint stamina;
  }

  god[] public gods;

  event Newgod(address indexed owner, uint256 id, uint256 dna);

  function _createRandomNum(uint256 _mod) internal view returns (uint256) {
    uint256 randomNum = uint256(
      keccak256(abi.encodePacked(block.timestamp, msg.sender))
    );
    return randomNum % _mod;
  }

  function _creategod(string memory _name) internal {
    uint8 randRarity = uint8(_createRandomNum(100));
    uint256 randDna = _createRandomNum(10**16);
    uint8 randattack = uint8(_createRandomNum(100));
    uint8 randdefense = uint8(_createRandomNum(100));
    uint8 randstamina = uint8(_createRandomNum(100));

    god memory newgod = god(_name, counter, randDna, 1, randRarity,randattack,randdefense,randstamina);
    gods.push(newgod);
    _safeMint(msg.sender, counter);
    emit Newgod(msg.sender, counter, randDna);
    counter++;
  }

  function createRandomgod(string memory _name) public payable {
    require(msg.value >= fee);
    _creategod(_name);
  }

 
  function getgods() public view returns (god[] memory) {
    return gods;
  }

  function getOwnergods(address _owner) public view returns (god[] memory) {
    god[] memory result = new god[](balanceOf(_owner));
    uint256 cnt = 0;
    for (uint256 i = 0; i < gods.length; i++) {
      if (ownerOf(i) == _owner) {
        result[cnt] = gods[i];
        cnt++;
      }
    }
    return result;
  }

  function levelUp(uint256 _godId) public {
    require(ownerOf(_godId) == msg.sender);
    god storage gd = gods[_godId];
    gd.level++;
  }
}
