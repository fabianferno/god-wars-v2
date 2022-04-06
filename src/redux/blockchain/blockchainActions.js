// constants
import Web3 from "web3";
import GodToken from "../../contracts/GodToken.json";
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      // let web3 = new Web3(window.ethereum);
      const web3 = new Web3('https://rpctest.meter.io');
      try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const godToken = new web3.eth.Contract(
            GodToken,
            "0x414672Ce298e254556B1F4B1145401f8E96EE66f"
            // "0x079f567B7f1596d51e8f4D2Bc362ee0FE3bB1a0f"
            // "0x4927777Af08108e62620B052f4a8577507DB0441"
          );
          console.log(accounts)
          console.log(godToken)
          dispatch(
            connectSuccess({
              account: accounts[0],
              godToken: godToken,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
