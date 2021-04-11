import React, { useState, useEffect } from 'react';
import PetHelper from '../abis/PetHelper.json';
import Web3 from 'web3'
import './App.css';

function App() {
  
  const [web3State, setWeb3State] = useState(false);
  const [petHelperSmartContract, setPetHelperSmartContract] = useState({})
  const [userMetaMaskAccount, setUserMetaMaskAccount] = useState('')
  const [pets, setPets] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const loadWeb3 = async()=> {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      setWeb3State(true)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      setWeb3State(true)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  const loadBlockchainData = async()=> {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setUserMetaMaskAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = PetHelper.networks[networkId]
    if(networkData) {      
      const petHelperSmartContract = web3.eth.Contract(PetHelper.abi, networkData.address)
      setPetHelperSmartContract(petHelperSmartContract)
      const totalPets = await petHelperSmartContract.methods.totalPets().call();
      console.log(totalPets)
      for (var i = 0; i < totalPets; i++) {
        const pet = await petHelperSmartContract.methods.petsLedger(i).call()
        console.log(pet)
        setPets( oldPets => [...oldPets, pet])        
      }
      setIsLoading(false)
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  useEffect(() => {
    if (!web3State) {
      loadWeb3();
      loadBlockchainData();
    }
  }, []);
  

    return (
      <div>
        <center>Ethereum Pet's Helper</center>
        <div id="content">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Pet Id</th>
                <th scope="col">Current Balance</th>
                <th scope="col">History Balance</th>
                <th scope="col">Person In Charge</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="petsList">
              { pets.map(pet => {
                return(
                  <tr key={pet.id}>
                    f
                    <th scope="row">{pet.id.toString()}</th>
                    <td>{pet.id.toString()}</td>
                    <td>1 Eth</td>
                    <td>{pet.personInCharge.toString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default App;
