import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./components/home";
import Cart from "./components/cart";
import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Button } from "@mui/material";

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

  return (
    <div className="ComponentBody">
      <div className="TopBar">
        {page === "home" && (
          <div className="AppHeader">
            <Button style={{ color: "white" }} className="Refresh">
              <RefreshRoundedIcon onClick={() => refresh()} />
            </Button>

            <p className="IndicadorCarrinho">
              <Button style={{ color: "white" }} className="CartIcon">
                <ShoppingCartIcon onClick={() => setPage("cart")} />
              </Button>

              {cart.length}
            </p>
          </div>
        )}
        {page === "cart" && (
          <div className="AppHeader">
            <Button className="BackButton" style={{ color: "white" }}>
              <KeyboardReturnRoundedIcon
                onClick={() => setPage("home")}
                className="BackButton"
              />
            </Button>
          </div>
        )}
      </div>
      {page === "home" && (
        <div className="AppBody">
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
        <div className="AppBody">
          <Cart
            cart={cart}
            list={list}
            setCart={setCart}
            setTotalPrice={setTotalPrice}
          />
        </div>
      )}
      <div className="AppFooter">
        <div className="FooterBar">
          <p className="FooterText">Total: R$ {totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
