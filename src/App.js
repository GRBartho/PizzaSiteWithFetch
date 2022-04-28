import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./components/home";
import Cart from "./components/cart";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const url =
    "https://homologation.stbl.com.br/estoque/produtos_app/?format=json";

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const cart_list = list.filter((o) => o.qtd > 0);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((parentData) => {
        const res = parentData.results.map((p) => ({ ...p, qtd: 0 }));
        setList(res);
        setLoading(false);
      })
      .catch(() => {
        console.log("Alguma coisa deu errado");
      });
  }, []);

  console.log(list);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart cart_list={cart_list} />} />
      </Routes>
    </div>
  );
};

export default App;
