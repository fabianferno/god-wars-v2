// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      
      let allGods = await store
        .getState()
        .blockchain.godToken.methods.getGods()
        .call();
      let allOwnerGods = await store
        .getState()
        .blockchain.godToken.methods.getOwnerGods(account)
        .call();

      dispatch(
        fetchDataSuccess({
          allGods,
          allOwnerGods,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
