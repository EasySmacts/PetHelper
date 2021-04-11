const PetHelperSmartContractSol = artifacts.require("PetHelper.sol");
contract('PetHelper', (accounts) => {
    let petHelperSmartContract
    before(async () => {
        // Load Contract
        petHelperSmartContract = await PetHelperSmartContractSol.deployed();
    })
    it('Should deploy the smart contract properly', async() => {
        assert.notEqual(petHelperSmartContract.address, '', "smart contract address should not be blank")
    })
    it('Should smart contract has admin address', async() => {
        assert.equal(await petHelperSmartContract.admin(), accounts[0], "account 0 should be admin")
    })
    it('Should admin add 1 new pet [totalPets - 1]', async() => {
        let txResponse = await petHelperSmartContract.addNewPet(accounts[1], 0, {from:accounts[0]})
        let totelPets = await petHelperSmartContract.totalPets();
        assert.equal(totelPets, 1, "total pets should be 1")
    })
    it('Should admin add 1 new pet [totalPets - 2]', async() => {
        let txResponse = await petHelperSmartContract.addNewPet(accounts[1], 1, {from:accounts[0]})
        let totelPets = await petHelperSmartContract.totalPets()
        assert.equal(totelPets, 2, "total pets should be 2")
    })
    it('Should NOT add a new pet if not admin', async() => {
        try{
            let txResponse = await petHelperSmartContract.addNewPet(accounts[1], 2, {from:accounts[1]})
        }catch(e){
            assert.equal(e.reason, 'only admin can add pets', "only admin can add pets")
            return
        }
        assert.equal(false, true, "this test should not pass")
    })
    it('Should NOT add a new pet if pet id already used', async() => {
        try{
            let txResponse = await petHelperSmartContract.addNewPet(accounts[1], 1, {from:accounts[0]})
        }catch(e){
            assert.equal(e.reason, 'PetId already in use', "petid was already in use")
            return
        }
        assert.equal(false, true, "this test should not pass")
    })
    it('Should help pet that exists', async() => {
        let txResponse = await petHelperSmartContract.helpPet(0, {from:accounts[0], value: web3.utils.toWei('1', 'Ether')})
        let txResponse2 = await petHelperSmartContract.helpPet(0, {from:accounts[2], value: web3.utils.toWei('1', 'Ether')})
        let txResponse3 = await petHelperSmartContract.helpPet(1, {from:accounts[2], value: web3.utils.toWei('1', 'Ether')})
        const petStruct = await petHelperSmartContract.petsLedger(0);
        assert.equal( petStruct.currentBalance, 2000000000000000000, "some eth got lost")
    })
    it('Should NOT help pet that if not exists', async() => {
        try{
            let txResponse = await petHelperSmartContract.helpPet(404, {from:accounts[5], value: web3.utils.toWei('1', 'Ether')})
        }catch(e){
            assert.equal(e.reason, 'This pet do not exists', 'CHECK - UNKNOWN ERROR')
            return
        }
        assert.equal(false, true, "this test should not pass")
    })
    it("Should the pet's person in charge withdraw funds", async() => {        
        let txResponse = await petHelperSmartContract.withdrawPetFunds(0, {from:accounts[1]})
        let petStruct = await petHelperSmartContract.petsLedger(0);
        assert.equal(petStruct.currentBalance, 0)
    })

    it('Should admin withdraw funds', async() => {
        let txResponse = await petHelperSmartContract.withdrawPetFunds(1, {from:accounts[0]})
        let petStruct = await petHelperSmartContract.petsLedger(1);
        assert.equal(petStruct.currentBalance, 0)
    })
    it('Should withdraw funds if pet has balance', async() => {
        try{
            let txResponse = await petHelperSmartContract.withdrawPetFunds(0, {from:accounts[0]})
        }catch(e){
            assert.equal(e.reason, 'This pet has no balance to withdraw')
            return
        }
        assert.equal(false, true, "this test should not pass")
    })

})