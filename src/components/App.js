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
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  useEffect(() => {
    if (false) {
      loadWeb3();
      loadBlockchainData();
    }
  }, []);
  

    return (
      <>
      <div  class="bg-green-50 flex flex-col justify-center max-w-full max-h-screen" >
        <nav class="flex items-center justify-center flex-wrap bg-green-500 p-6">
          <div class="flex items-center flex-no-shrink text-white mr-6">
            <svg class="h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M 39.041 36.843 c 2.054 3.234 3.022 4.951 3.022 6.742 c 0 3.537 -2.627 5.252 -6.166 5.252 c -1.56 0 -2.567 -0.002 -5.112 -1.326 c 0 0 -1.649 -1.509 -5.508 -1.354 c -3.895 -0.154 -5.545 1.373 -5.545 1.373 c -2.545 1.323 -3.516 1.309 -5.074 1.309 c -3.539 0 -6.168 -1.713 -6.168 -5.252 c 0 -1.791 0.971 -3.506 3.024 -6.742 c 0 0 3.881 -6.445 7.244 -9.477 c 2.43 -2.188 5.973 -2.18 5.973 -2.18 h 1.093 v -0.001 c 0 0 3.698 -0.009 5.976 2.181 C 35.059 30.51 39.041 36.844 39.041 36.843 z M 16.631 20.878 c 3.7 0 6.699 -4.674 6.699 -10.439 S 20.331 0 16.631 0 S 9.932 4.674 9.932 10.439 S 12.931 20.878 16.631 20.878 z M 10.211 30.988 c 2.727 -1.259 3.349 -5.723 1.388 -9.971 s -5.761 -6.672 -8.488 -5.414 s -3.348 5.723 -1.388 9.971 C 3.684 29.822 7.484 32.245 10.211 30.988 z M 32.206 20.878 c 3.7 0 6.7 -4.674 6.7 -10.439 S 35.906 0 32.206 0 s -6.699 4.674 -6.699 10.439 C 25.507 16.204 28.506 20.878 32.206 20.878 z M 45.727 15.602 c -2.728 -1.259 -6.527 1.165 -8.488 5.414 s -1.339 8.713 1.389 9.972 c 2.728 1.258 6.527 -1.166 8.488 -5.414 S 48.455 16.861 45.727 15.602 z"/></svg>
            <span class="font-semibold text-xl tracking-tight">Pet Helper Dapp</span>
            <svg class="h-8 w-8 ml-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M 39.041 36.843 c 2.054 3.234 3.022 4.951 3.022 6.742 c 0 3.537 -2.627 5.252 -6.166 5.252 c -1.56 0 -2.567 -0.002 -5.112 -1.326 c 0 0 -1.649 -1.509 -5.508 -1.354 c -3.895 -0.154 -5.545 1.373 -5.545 1.373 c -2.545 1.323 -3.516 1.309 -5.074 1.309 c -3.539 0 -6.168 -1.713 -6.168 -5.252 c 0 -1.791 0.971 -3.506 3.024 -6.742 c 0 0 3.881 -6.445 7.244 -9.477 c 2.43 -2.188 5.973 -2.18 5.973 -2.18 h 1.093 v -0.001 c 0 0 3.698 -0.009 5.976 2.181 C 35.059 30.51 39.041 36.844 39.041 36.843 z M 16.631 20.878 c 3.7 0 6.699 -4.674 6.699 -10.439 S 20.331 0 16.631 0 S 9.932 4.674 9.932 10.439 S 12.931 20.878 16.631 20.878 z M 10.211 30.988 c 2.727 -1.259 3.349 -5.723 1.388 -9.971 s -5.761 -6.672 -8.488 -5.414 s -3.348 5.723 -1.388 9.971 C 3.684 29.822 7.484 32.245 10.211 30.988 z M 32.206 20.878 c 3.7 0 6.7 -4.674 6.7 -10.439 S 35.906 0 32.206 0 s -6.699 4.674 -6.699 10.439 C 25.507 16.204 28.506 20.878 32.206 20.878 z M 45.727 15.602 c -2.728 -1.259 -6.527 1.165 -8.488 5.414 s -1.339 8.713 1.389 9.972 c 2.728 1.258 6.527 -1.166 8.488 -5.414 S 48.455 16.861 45.727 15.602 z"/></svg>
          </div>
        </nav>                
      </div>
      <div class="container mx-auto px-10">
      <div class="separator text-xl mt-10">Pets</div>
      <div class='max-w-lg w-full rounded-lg mx-auto'>
        <div class='flex items-center space-x-4 p-3 justify-center mt-8'>
          <div class="flex flex-row-reverse">
            <img class='w-20 h-20  rounded-full ring-2 ring-white -mr-1' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'/>
            <img class='w-20 h-20  rounded-full ring-2 ring-white -mr-1' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'/>
            <img class='w-20 h-20  rounded-full ring-2 ring-white -mr-1' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'/>
            <img class='w-20 h-20  rounded-full ring-2 ring-white -mr-1' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'/>
          </div>
        </div>
      </div>
        <div class="separator text-xl mt-10">Stats</div>
        <div class=" flex items-center justify-center  font-sans overflow-hidden ">
            <div class="w-full lg:w-5/6">
                <div class="bg-white shadow-md rounded my-6">
                    <table class="min-w-max w-full table-auto shadow-lg">
                        <thead>
                            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-center">Pet's Shelters</th>
                                <th class="py-3 px-6 text-center">Current Balance</th>
                                <th class="py-3 px-6 text-center">Person In Charge</th>
                                <th class="py-3 px-6 text-center">No. Pets Helped</th>
                                <th class="py-3 px-6 text-center">Instagram</th>
                                <th class="py-3 px-6 text-center">Help</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 text-sm font-light">
                          <tr class="border-b border-gray-200 hover:bg-gray-100">
                                <td class="py-3 px-6">
                                    <div class="text-center font-medium">
                                        1
                                    </div>
                                </td>
                                <td class="py-3 px-6">
                                    <div class="text-center">
                                      1.2 ETH
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <div class="flex items-center justify-center">
                                        <div class="mr-2">
                                            <img class="w-6 h-6 rounded-full transform hover:scale-125" src="https://randomuser.me/api/portraits/men/1.jpg"/>
                                        </div>
                                        <span>3WD4FDSG4G23NLMCPEQEQ...</span>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <div class="flex item-center justify-center">
                                        <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                              <td class="py-3 px-6">
                                <div class="text-center font-medium">
                                  2
                                </div>
                              </td>
                              <td class="py-3 px-6">
                                <div class="text-center">
                                  0.5 ETH
                                </div>
                              </td>
                              <td class="py-3 px-6 text-center">
                                <div class="flex items-center justify-center">
                                  <div class="mr-2">
                                    <img class="w-6 h-6 rounded-full transform hover:scale-125" src="https://randomuser.me/api/portraits/women/2.jpg"/>
                                  </div>
                                  <span>3WD4FDSG4G23NLMCPEQEQ...</span>
                                </div>
                              </td>
                              <td class="py-3 px-6 text-center">
                                <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Completed</span>
                              </td>
                              <td class="py-3 px-6 text-center">
                                    <div class="flex item-center justify-center">
                                        <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 hover:bg-gray-100">
                              <td class="py-3 px-6">
                                <div class="text-center font-medium">
                                  3
                                </div>
                              </td>
                              <td class="py-3 px-6">
                                <div class="text-center">
                                  0.0003 ETH
                                </div>
                              </td>
                              <td class="py-3 px-6 text-center">
                                <div class="flex items-center justify-center">
                                  <div class="mr-2">
                                    <img class="w-6 h-6 rounded-full transform hover:scale-125" src="https://randomuser.me/api/portraits/men/3.jpg"/>
                                  </div>
                                  <span>3WD4FDSG4G23NLMCPEQEQ...</span>
                                </div>
                              </td>
                              <td class="py-3 px-6 text-center">
                                <span class="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">Scheduled</span>
                              </td>
                              <td class="py-3 px-6 text-center">
                                    <div class="flex item-center justify-center">
                                        <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="separator text-xl mt-10">Team</div>
        <div class="flex sm:flex-col md:flex-row justify-center gap-10">
          <div>
            <div class="wrapper  antialiased text-gray-900 my-10">
              <div>    
                <img src="https://source.unsplash.com/random/300x300" alt=" random imgee" class="w-full object-cover object-center rounded-full shadow-2xl"/>        
                <div class="relative px-4 -mt-16  ">
                  <div class="bg-white p-6 rounded-lg shadow-2xl">
                    <h4 class="mt-1 text-xl text-center font-bold uppercase leading-tight truncate">- David Cuentas -</h4> 
                    <div class="mt-1 text-center">
                      Blockchain Developer
                    </div>
                    <div class="mt-1 text-center">
                      <svg class="inline-block mx-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      <svg class="inline-block mx-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      <svg class="inline-block mx-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </div>
                  </div>
                </div>  
              </div>
            </div>              
          </div>
        </div>
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="flex flex-col items-center w-full max-w-xs p-4 bg-white rounded-3xl md:flex-row">
            <div class="-mt-28 md:-my-16 md:-ml-32" style={{"clip-path": "url(#roundedPolygon)"}}>
            <img
                class="w-auto h-48"
                src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                alt="Ahmed Kamel"
            />
            </div>
            <div class="flex flex-col space-y-4">
            <div class="flex flex-col items-center md:items-start">
                <h2 class="text-xl font-medium">Ahmed Kamel</h2>
                <p class="text-base font-medium text-gray-400">Full Stack Developer</p>
            </div>
            <div class="flex items-center justify-center space-x-3 md:justify-start">
                <a
                href="https://twitter.com/ak_kamona"
                target="_blank"
                class="transition-transform transform hover:scale-125"
                >
                <span class="sr-only">Twitter</span>
                <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-blue-500"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                    d="M19.633,7.997c0.013,0.175,0.013,0.349,0.013,0.523c0,5.325-4.053,11.461-11.46,11.461c-2.282,0-4.402-0.661-6.186-1.809 c0.324,0.037,0.636,0.05,0.973,0.05c1.883,0,3.616-0.636,5.001-1.721c-1.771-0.037-3.255-1.197-3.767-2.793 c0.249,0.037,0.499,0.062,0.761,0.062c0.361,0,0.724-0.05,1.061-0.137c-1.847-0.374-3.23-1.995-3.23-3.953v-0.05 c0.537,0.299,1.16,0.486,1.82,0.511C3.534,9.419,2.823,8.184,2.823,6.787c0-0.748,0.199-1.434,0.548-2.032 c1.983,2.443,4.964,4.04,8.306,4.215c-0.062-0.3-0.1-0.611-0.1-0.923c0-2.22,1.796-4.028,4.028-4.028 c1.16,0,2.207,0.486,2.943,1.272c0.91-0.175,1.782-0.512,2.556-0.973c-0.299,0.935-0.936,1.721-1.771,2.22 c0.811-0.088,1.597-0.312,2.319-0.624C21.104,6.712,20.419,7.423,19.633,7.997z"
                    ></path>
                </svg>
                </a>
                <a
                href="https://github.com/Kamona-WD"
                target="_blank"
                class="transition-transform transform hover:scale-125"
                >
                <span class="sr-only">Github</span>
                <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-black"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.026,2c-5.509,0-9.974,4.465-9.974,9.974c0,4.406,2.857,8.145,6.821,9.465 c0.499,0.09,0.679-0.217,0.679-0.481c0-0.237-0.008-0.865-0.011-1.696c-2.775,0.602-3.361-1.338-3.361-1.338 c-0.452-1.152-1.107-1.459-1.107-1.459c-0.905-0.619,0.069-0.605,0.069-0.605c1.002,0.07,1.527,1.028,1.527,1.028 c0.89,1.524,2.336,1.084,2.902,0.829c0.091-0.645,0.351-1.085,0.635-1.334c-2.214-0.251-4.542-1.107-4.542-4.93 c0-1.087,0.389-1.979,1.024-2.675c-0.101-0.253-0.446-1.268,0.099-2.64c0,0,0.837-0.269,2.742,1.021 c0.798-0.221,1.649-0.332,2.496-0.336c0.849,0.004,1.701,0.115,2.496,0.336c1.906-1.291,2.742-1.021,2.742-1.021 c0.545,1.372,0.203,2.387,0.099,2.64c0.64,0.696,1.024,1.587,1.024,2.675c0,3.833-2.33,4.675-4.552,4.922 c0.355,0.308,0.675,0.916,0.675,1.846c0,1.334-0.012,2.41-0.012,2.737c0,0.267,0.178,0.577,0.687,0.479 C19.146,20.115,22,16.379,22,11.974C22,6.465,17.535,2,12.026,2z"
                    ></path>
                </svg>
                </a>
            </div>
            </div>
        </div>



        <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
            <defs>
            <clipPath id="roundedPolygon">
                <path
                d="M79 6.237604307034a32 32 0 0 1 32 0l52.870489570875 30.524791385932a32 32 0 0 1 16 27.712812921102l0 61.049582771864a32 32 0 0 1 -16 27.712812921102l-52.870489570875 30.524791385932a32 32 0 0 1 -32 0l-52.870489570875 -30.524791385932a32 32 0 0 1 -16 -27.712812921102l0 -61.049582771864a32 32 0 0 1 16 -27.712812921102"
                />
            </clipPath>
            </defs>
        </svg>
    </div>


    <div class="fixed bottom-5 right-5 flex items-center space-x-4">
      <a href="https://twitter.com/ak_kamona" target="_blank" class="transition-transform transform hover:scale-125">
        <span class="sr-only">Twitter</span>
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-blue-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
                >
          <path d="M19.633,7.997c0.013,0.175,0.013,0.349,0.013,0.523c0,5.325-4.053,11.461-11.46,11.461c-2.282,0-4.402-0.661-6.186-1.809 c0.324,0.037,0.636,0.05,0.973,0.05c1.883,0,3.616-0.636,5.001-1.721c-1.771-0.037-3.255-1.197-3.767-2.793 c0.249,0.037,0.499,0.062,0.761,0.062c0.361,0,0.724-0.05,1.061-0.137c-1.847-0.374-3.23-1.995-3.23-3.953v-0.05 c0.537,0.299,1.16,0.486,1.82,0.511C3.534,9.419,2.823,8.184,2.823,6.787c0-0.748,0.199-1.434,0.548-2.032 c1.983,2.443,4.964,4.04,8.306,4.215c-0.062-0.3-0.1-0.611-0.1-0.923c0-2.22,1.796-4.028,4.028-4.028 c1.16,0,2.207,0.486,2.943,1.272c0.91-0.175,1.782-0.512,2.556-0.973c-0.299,0.935-0.936,1.721-1.771,2.22 c0.811-0.088,1.597-0.312,2.319-0.624C21.104,6.712,20.419,7.423,19.633,7.997z"
                ></path>
        </svg>
      </a>
      <a href="https://github.com/Kamona-WD" target="_blank" class="transition-transform transform hover:scale-125">
        <span class="sr-only">Github</span>
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-black"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            >
            <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.026,2c-5.509,0-9.974,4.465-9.974,9.974c0,4.406,2.857,8.145,6.821,9.465 c0.499,0.09,0.679-0.217,0.679-0.481c0-0.237-0.008-0.865-0.011-1.696c-2.775,0.602-3.361-1.338-3.361-1.338 c-0.452-1.152-1.107-1.459-1.107-1.459c-0.905-0.619,0.069-0.605,0.069-0.605c1.002,0.07,1.527,1.028,1.527,1.028 c0.89,1.524,2.336,1.084,2.902,0.829c0.091-0.645,0.351-1.085,0.635-1.334c-2.214-0.251-4.542-1.107-4.542-4.93 c0-1.087,0.389-1.979,1.024-2.675c-0.101-0.253-0.446-1.268,0.099-2.64c0,0,0.837-0.269,2.742,1.021 c0.798-0.221,1.649-0.332,2.496-0.336c0.849,0.004,1.701,0.115,2.496,0.336c1.906-1.291,2.742-1.021,2.742-1.021 c0.545,1.372,0.203,2.387,0.099,2.64c0.64,0.696,1.024,1.587,1.024,2.675c0,3.833-2.33,4.675-4.552,4.922 c0.355,0.308,0.675,0.916,0.675,1.846c0,1.334-0.012,2.41-0.012,2.737c0,0.267,0.178,0.577,0.687,0.479 C19.146,20.115,22,16.379,22,11.974C22,6.465,17.535,2,12.026,2z"
                  ></path>
        </svg>
      </a>
    </div>
      </div>
      </>
    );
}

export default App;
