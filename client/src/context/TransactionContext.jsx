import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({ provider, signer, transactionContract });
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({addressTo: "", amount: "", keyword: "", message: ""});

  const handleChange = (e, name) => {
    setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.value,
    }));
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please install MetaMask!");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
      console.log(accounts);
    } catch (error) {
      console.error(error);
      throw new Error("Error checking wallet connection");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install MetaMask!");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log(accounts);
    } catch (error) {
      console.error(error);
      throw new Error("Error connecting to wallet");
    }
  };

  const sendTransaction = async (amount) => {
    try {
        if (!ethereum) {
            return alert("Please install MetaMask!");
        }

    } catch (error) {
        console.error(error);
        throw new Error("Error sending transaction");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};