// SPDX-License-Identifier: MIT
pragma solidity = 0.8.3;
contract PetHelper{
    address public admin;
    uint public totalPets;
    mapping(uint => PetStruct) public petsLedger;
    struct PetStruct{
        uint id;
        uint currentBalance;
        address personInCharge;
        bool isValue;
    }
    constructor() {
        admin = msg.sender;
    }
    function addNewPet(address _personInCharge, uint _petId) external{
        require(msg.sender == admin, 'only admin can add pets');
        require(petsLedger[_petId].isValue == false, 'PetId already in use');
        petsLedger[totalPets] = PetStruct(totalPets, 0, _personInCharge, true);
        totalPets +=1;
    }
    function helpPet(uint _petId) external payable{
        require(msg.value > 0, 'The amount to deposit must be > 0');
        require(petsLedger[_petId].isValue == true, 'This pet do not exists');
        petsLedger[_petId].currentBalance += msg.value;
    }
    function withdrawPetFunds(uint _petId) external {
        require(msg.sender == petsLedger[_petId].personInCharge || msg.sender == admin, 'Only personInCharge and admin can withdraw funds');
        require(petsLedger[_petId].isValue == true, 'This pet do not exists');
        require(petsLedger[_petId].currentBalance > 0, 'This pet has no balance to withdraw');
        uint amountToWithdraw = petsLedger[_petId].currentBalance;
        petsLedger[_petId].currentBalance = 0;
        if(msg.sender == petsLedger[_petId].personInCharge){
            payable(petsLedger[_petId].personInCharge).transfer(amountToWithdraw);
        }else{
            payable(admin).transfer(amountToWithdraw);
        }
    }
}