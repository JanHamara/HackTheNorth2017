pragma solidity ^0.4.2;

contract MedLink {
	mapping (address => uint) balances;
	string fireBaseUrl;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function MedLink() {
		balances[tx.origin] = 10000;
		fireBaseUrl = "initialized";
	}

	function setFireBaseArr(string url) {
		fireBaseUrl = url;
	}

	function getFireBaseArr() constant returns(string){
		return fireBaseUrl;
	}

	function stringToBytes32(string memory source) returns (bytes32 result) {
    	assembly {
        	result := mload(add(source, 32))
    	}
	}
}
