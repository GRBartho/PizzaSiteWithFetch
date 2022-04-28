import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

const Home = () => {
  const url =
    "https://homologation.stbl.com.br/estoque/produtos_app/?format=json";

  const [totalPrice, setTotalPrice] = useState(0);
  const [list, setList] = useState([]);
  const [opened, setOpened] = useState(null);
  const [loading, setLoading] = useState(true);
  const cart_list = list.filter((o) => o.qtd > 0);

  const parentFilter = (o) => o.item_pai === true && o.valor_venda > 0;
  const childFilter = (o) => o.item_filho === true && o.valor_venda > 0;

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

  if (loading === true) {
    return (
      <div className="LoadingDiv">
        <CircularProgress className="Loading" color="inherit" />
      </div>
    );
  } else {
    return (
      <div className="All">
        <div className="TopBar">
          <a href="/">
            <RefreshRoundedIcon className="Refresh" title="refresh page" />
          </a>

          <p className="IndicadorCarrinho">
            <a href="/cart">
              <ShoppingCartIcon />
            </a>
            {cart_list.length}
          </p>
          <p className="Cart">
            {cart_list.map((cart_prod) => (
              <p>
                {cart_prod.qtd}x {cart_prod.descricao}
              </p>
            ))}
          </p>
        </div>
        <div className="Header">
          <img
            alt=""
            className="HBImage"
            src="https://thumbs.dreamstime.com/b/italian-pizza-fresh-salad-red-wine-wide-composition-party-dinner-flat-lay-various-kinds-glasses-over-rustic-wooden-table-174281796.jpg"
          />
          <div className="IMGBottom">
            <p className="IMGBottomText">Bem bonito</p>
          </div>
        </div>

        <div className="Product">
          {list.filter(parentFilter).map((parentProd) => {
            const func = () => {
              setOpened(parentProd.id === opened ? null : parentProd.id);
            };
            return (
              <div className="IndividualProducts">
                <p className="ProductTitle">Pizza {parentProd.descricao}</p>
                <img
                  alt="product"
                  className="ProdIMG"
                  src={parentProd.url_imagem}
                />
                <div className="OpenBtn">
                  <button className="OpenList" onClick={func} margin="5px">
                    <MenuRoundedIcon className="butText" />
                  </button>
                </div>
                {opened === parentProd.id && (
                  <div className="ChildProducts">
                    {list.filter(childFilter).map((childProd) => {
                      const prod = list.filter(
                        (o) =>
                          o.cod_pai === parentProd.id && o.id === childProd.id
                      )[0];

                      const decreasePrice = () => {
                        setTotalPrice(
                          (prev_price) => prev_price - childProd.valor_venda
                        );
                      };
                      const decreaseQtd = () => {
                        setList((list) => {
                          const obj = {
                            ...list.filter(
                              (o) =>
                                o.cod_pai === parentProd.id &&
                                o.id === childProd.id
                            )[0],
                          };
                          obj.qtd--;

                          const arraySemObj = list.filter(
                            (o) =>
                              o.cod_pai !== parentProd.id ||
                              o.id !== childProd.id
                          );

                          return [...arraySemObj, obj].sort(
                            (a, b) => a.id - b.id
                          );
                        });
                      };

                      const decrease = () => {
                        decreasePrice();
                        decreaseQtd();
                      };

                      const increasePrice = () => {
                        setTotalPrice(
                          (prev_price) => prev_price + childProd.valor_venda
                        );
                      };

                      const increaseQtd = () => {
                        setList((list) => {
                          const obj = {
                            ...list.filter(
                              (o) =>
                                o.cod_pai === parentProd.id &&
                                o.id === childProd.id
                            )[0],
                          };
                          obj.qtd++;

                          const arraySemObj = list.filter(
                            (o) =>
                              o.cod_pai !== parentProd.id ||
                              o.id !== childProd.id
                          );

                          return [...arraySemObj, obj].sort(
                            (a, b) => a.id - b.id
                          );
                        });
                      };

                      const increase = () => {
                        increasePrice();
                        increaseQtd();
                      };

                      if (childProd.cod_pai === parentProd.id) {
                        return (
                          <div>
                            <div className="ChildName">
                              <p className="ChildText">
                                Pizza {childProd.descricao}
                              </p>
                              <button
                                onClick={decrease}
                                disabled={
                                  prod.qtd <= 0 || prod.qtd === undefined
                                }
                                className="Button"
                              >
                                -
                              </button>
                              <div>{prod.qtd}</div>
                              <button className="Button" onClick={increase}>
                                +
                              </button>
                            </div>
                            <img
                              alt="Produto Filho"
                              className="ImagemFilho"
                              src={childProd.url_imagem}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="FooterBar">
          <p className="FooterText">Total: R$ {totalPrice}</p>
        </div>
      </div>
    );
  }
};

export default Home;
