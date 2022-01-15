import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import GodRenderer from "./components/godRenderer";
import _color from "./assets/images/bg/_color.png";
import "./assets/css/bootstrap.css";

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);

  console.log(data);

  const mintNFT = (_account, _name) => {
    setLoading(true);
    console.log(_account);
    blockchain.godToken.methods
      .createRandomGod(_name)
      .send({
        from: _account,
        value: blockchain.web3.utils.toWei("0.01", "ether"),
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  const levelUpGod = (_account, _id) => {
    setLoading(true);
    blockchain.godToken.methods
      .levelUp(_id)
      .send({
        from: _account,
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  useEffect(() => {
    if (blockchain.account != "" && blockchain.godToken != null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.godToken, blockchain.account]);

  return (
    <s.Screen image={_color}>
      {blockchain.account === "" || blockchain.godToken === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the game</s.TextTitle>
          <s.SpacerSmall />
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </button>
          <s.SpacerXSmall />
          {blockchain.errorMsg != "" ? <div>{blockchain.errorMsg}</div> : null}
        </s.Container>
      ) : (
        <s.Container ai={"center"} style={{ padding: "24px" }}>
          <div className="text-white h1 fw-bold">Welcome to the God Wars</div>
          <s.SpacerSmall />
          <button
            className="btn btn-warning fw-bold w-100 "
            disabled={loading ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              mintNFT(blockchain.account, "Unknown");
            }}
          >
            Create God Based NFT Card
          </button>
          <s.SpacerMedium />
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }}>
            {data.allGods.map((item, index) => {
              return (
                <div className="mx-3 card card-body bg-dark shadow">
                  <s.Container
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <GodRenderer god={item} />
                    <s.SpacerXSmall />
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <div className="text-white text-center my-1">
                        ID:{" "}
                        <span className="ms-2 fw-bold badge pill bg-warning text-dark">
                          {item.id}
                        </span>
                      </div>
                      <div className="text-white text-center my-1">
                        DNA:{" "}
                        <span className="ms-2 fw-bold badge pill bg-warning text-dark">
                          {item.dna}
                        </span>
                      </div>
                      <div className="text-white text-center my-1">
                        LEVEL:{" "}
                        <span className="ms-2 fw-bold badge pill bg-warning text-dark">
                          {item.level}
                        </span>
                      </div>
                      <div className="text-white text-center my-1">
                        NAME:
                        <span className="ms-2 fw-bold badge pill bg-warning text-dark">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-white text-center my-1">
                        RARITY:
                        <span className="ms-2 fw-bold badge pill bg-warning text-dark">
                          {item.rarity}
                        </span>
                      </div>
                      <div className="text-white text-center my-1">
                        ATTACK:
                        <span className="ms-2 fw-bold badge pill bg-warning text-dark">
                          {item.attack}
                        </span>
                      </div>
                      <div className="text-white text-center my-1">
                        DEFENSE:
                        <span className="ms-2 fw-bold badge pill bg-warning text-dark">
                          {item.defense}
                        </span>
                      </div>
                      <div className="text-white text-center my-1">
                        STAMINA:
                        <span className="ms-2 fw-bold badge pill bg-warning text-dark">
                          {item.stamina}
                        </span>
                      </div>
                      <s.SpacerXSmall />
                      <button
                        className="btn btn-success fw-bold"
                        disabled={loading ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          levelUpGod(blockchain.account, item.id);
                        }}
                      >
                        Level Up
                      </button>
                    </div>
                  </s.Container>
                </div>
              );
            })}
          </s.Container>
        </s.Container>
      )}
    </s.Screen>
  );
}

export default App;
