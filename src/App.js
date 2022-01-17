import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import GodRenderer from "./components/godRenderer";
import _color from "./assets/images/bg/background.jpg";
import "./assets/css/bootstrap.css";

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);
  // const [eid, setEid] = useState(0);
  const eidRef = useRef(null);
  const [name, setName] = useState("");

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

  const fight = (_account, _id) => {
    setLoading(true);
    var eid = eidRef.current.value;
    blockchain.godToken.methods
      .fight(_id, eid)
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
    if (blockchain.account !== "" && blockchain.godToken !== null) {
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
          {blockchain.errorMsg !== "" ? <div>{blockchain.errorMsg}</div> : null}
        </s.Container>
      ) : (
        <div className="p-3">
          <div className="container text-center">
            <div className="text-white h5 my-5 text-center ">
              Welcome to the{" "}
              <span className="fw-bold h1 d-block">⚡ NFT God Wars ⚡</span>
            </div>

            <input
              type="text"
              className="bg-dark w-100 p-3 text-white form-control rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="btn btn-warning fw-bold w-100 btn-lg"
              disabled={loading ? 1 : 0}
              onClick={(e) => {
                e.preventDefault();
                mintNFT(blockchain.account, name);
              }}
            >
              Create a new NFT God Card ➕
            </button>
          </div>

          <div className="container">
            <section className="mt-5 align-items-center justify-content-center row">
              {data.allOwnerGods.map((item, index) => {
                return (
                  <div
                    className="col-xl-5 col-12 card m-2 bg-dark shadow"
                    key={index}
                  >
                    <div className="card-body d-md-flex">
                      <div className="  justify-content-center bg-secondary flex-column d-flex align-items-center">
                        <GodRenderer god={item} />
                        <div className="d-flex align-items-center justify-content-center flex-column mt-3">
                          <button
                            className="btn btn-primary btn-sm fw-bold w-100"
                            disabled={loading ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              levelUpGod(blockchain.account, item.id);
                            }}
                          >
                            Level Up ⚡
                          </button>

                          <div className="input-group ">
                            <input
                              placeholder="Opp ID"
                              type="number"
                              className="form-control  rounded"
                              ref={eidRef}
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-danger text-start fw-bold"
                                disabled={loading ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  fight(blockchain.account, item.id);
                                }}
                              >
                                Fight⚡
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <table class="table table-striped table-dark rounded-3 mt-3 mx-3">
                        <thead>
                          <tr>
                            <th className="text-secondary" scope="col">
                              #
                            </th>
                            <th className="fw-bold text-secondary" scope="col">
                              DESC
                            </th>
                            <th className="fw-bold text-secondary" scope="col">
                              VALUE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="text-secondary" scope="row">
                              1
                            </th>
                            <td className="text-secondary">ID No.</td>
                            <td> {item.id}</td>
                          </tr>
                          <tr>
                            <th className="text-secondary" scope="row">
                              2
                            </th>
                            <td className="text-secondary">DNA schema</td>
                            <td> {item.dna}</td>
                          </tr>
                          <tr>
                            <th className="text-secondary" scope="row">
                              3
                            </th>
                            <td className="text-secondary">Level</td>
                            <td>{item.level}</td>
                          </tr>
                          <tr>
                            <th className="text-secondary" scope="row">
                              4
                            </th>
                            <td className="text-secondary">Name</td>
                            <td>{item.name}</td>
                          </tr>
                          <tr>
                            <th className="text-secondary" scope="row">
                              5
                            </th>
                            <td className="text-secondary">Rarity</td>
                            <td>{item.rarity}</td>
                          </tr>
                          <tr>
                            <th className="text-secondary" scope="row">
                              6
                            </th>
                            <td className="text-secondary">Attack</td>
                            <td>{item.attack}</td>
                          </tr>
                          <tr>
                            <th className="text-secondary" scope="row">
                              7
                            </th>
                            <td className="text-secondary">Defense</td>
                            <td>{item.defense}</td>
                          </tr>
                          <tr>
                            <th className="text-secondary" scope="row">
                              8
                            </th>
                            <td className="text-secondary">Stamina</td>
                            <td>{item.stamina}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      )}

      <div className="badge text-secondary py-4 text-center ">
        Built by{" "}
        <span className="fw-bold text-white d-block">
          Fabian Ferno & Surbhit Agrawal
        </span>
      </div>
    </s.Screen>
  );
}

export default App;
