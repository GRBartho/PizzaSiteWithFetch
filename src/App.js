import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./components/home";
import Cart from "./components/cart";
import { WhiteC } from "./stories/Icons/CartButton.stories";
import { WhiteR } from "./stories/Icons/RefreshButton.stories";
import { WhiteBackButton } from "./stories/Icons/BackButton.stories";
import { Button } from "@mui/material";
import { DarkBar } from "./stories/Bar.stories";
import { CircularProgress } from "@mui/material";

const App = () => {
  const url =
    "https://homologation.stbl.com.br/estoque/produtos_app/?format=json";

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");

  function refresh() {
    window.location.reload(false);
  }

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((parentData) => {
        const res = parentData.results;
        setList(res);
        setLoading(false);
      })
      .catch(() => {
        console.log("Alguma coisa deu errado");
      });
  }, []);

  if (loading === true) {
    return (
      <div className="LoadingDiv">
        <CircularProgress className="Loading" color="inherit" />
      </div>
    );
  } else {
    return (
      <div className="ComponentBody">
        <DarkBar {...DarkBar.args}>
          {page === "home" && (
            <div className="AppHeader">
              <Button onClick={() => refresh()} style={{ color: "white" }}>
                <WhiteR {...WhiteR.args} />
              </Button>

              <p className="IndicadorCarrinho">
                <Button
                  onClick={() => setPage("cart")}
                  style={{ color: "white" }}
                  className="CartIcon"
                >
                  <WhiteC {...WhiteC.args} />
                </Button>

                {cart.length}
              </p>
            </div>
          )}
          {page === "cart" && (
            <div className="AppHeader">
              <Button onClick={() => setPage("home")}>
                <WhiteBackButton
                  {...WhiteBackButton.args}
                  className="BackButton"
                />
              </Button>
            </div>
          )}
        </DarkBar>
        {page === "home" && (
          <div className="AppBodyHome">
            <Home
              list={list}
              loading={loading}
              setTotalPrice={setTotalPrice}
              setCart={setCart}
              cart={cart}
            />
          </div>
        )}
        {page === "cart" && (
          <div className="AppBodyCart">
            <Cart
              cart={cart}
              list={list}
              setCart={setCart}
              setTotalPrice={setTotalPrice}
            />
          </div>
        )}
        <div className="AppFooter">
          <DarkBar className="FooterBar" {...DarkBar.args} flexDirection="row">
            <p className="FooterText">Total: R$ {totalPrice}</p>
          </DarkBar>
        </div>
      </div>
    );
  }
};

export default App;
