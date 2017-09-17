pragma solidity ^0.4.2;

contract MedLink {
	mapping (address => uint) balances;

	struct AddressRef {
		string city;
		string country;
		uint256 streetNo;
		string street;
		string zip;
	}

	struct PersonalData {
		uint256 nin;
		AddressRef addressref;
		string firstName;
		string secondName;
		string dateOfBirth;
		string zip;
		string mail;
		uint256 phoneNumber;
		string sex;
	}

	bytes32[] patientDataRef;

	address[] trustedAddresses;

	PersonalData personalData;

	string fireBaseUrl;

	address owner;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function MedLink() {
		msg.sender == owner;
		balances[tx.origin] = 10000;
		fireBaseUrl = "initialized";
	}

	function setFireBaseArr(string url) {
		fireBaseUrl = url;
	}

	function getFireBaseArr() constant returns(string){
		return fireBaseUrl;
	}

	
	function setPatientData(string url) {
		uint256 index = patientDataRef.length;
		patientDataRef[index] = stringToBytes32(url);
	}

	function getPatientDataRef() constant returns(string){
		return fireBaseUrl;
	}

	function registerDoctor (address addr) {
		if (msg.sender == owner) {
			trustedAddresses.push(addr);
		} else {
			throw;
		}
	}

	function getFirstName() returns (string) {
		return personalData.firstName;
	}

	function stringToBytes32(string memory source) returns (bytes32 result) {
    	assembly {
        	result := mload(add(source, 32))
    	}
	}
}
