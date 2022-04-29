import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";

const Home = ({ list, loading, setTotalPrice, setCart, cart }) => {
  const [opened, setOpened] = useState(null);

  const parentFilter = (o) => o.item_pai === true && o.valor_venda > 0;
  const childFilter = (o) => o.item_filho === true && o.valor_venda > 0;

  if (loading === true) {
    return (
      <div className="LoadingDiv">
        <CircularProgress className="Loading" color="inherit" />
      </div>
    );
  } else {
    return (
      <div className="All">
        <div className="Header">
          <img
            alt=""
            className="HBImage"
            src="https://thumbs.dreamstime.com/b/italian-pizza-fresh-salad-red-wine-wide-composition-party-dinner-flat-lay-various-kinds-glasses-over-rustic-wooden-table-174281796.jpg"
          />
          <div className="IMGBottom">
            <p className="IMGBottomText">
              <LocalPizzaIcon />
            </p>
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

                      const clickedObject = (o) => o.id === prod.id;

                      const notClickedObject = (o) => o.id !== prod.id;

                      const decreasePrice = () => {
                        setTotalPrice(
                          (prev_price) => prev_price - childProd.valor_venda
                        );
                      };
                      const decreaseQtd = () => {
                        const filteredProducts = cart.filter(clickedObject);

                        const clickedProduct = filteredProducts[0];

                        let quantity = null;

                        clickedProduct === undefined
                          ? (quantity = undefined)
                          : (quantity = clickedProduct.qtd);

                        if (quantity > 1) {
                          setCart((prev_cart) => {
                            const obj = {
                              ...prev_cart.filter(clickedObject)[0],
                            };
                            obj.qtd--;

                            const arraySemObj =
                              prev_cart.filter(notClickedObject);

                            return [...arraySemObj, obj];
                          });
                        } else {
                          setCart((prev_cart) => {
                            const arraySemObj =
                              prev_cart.filter(notClickedObject);

                            return [...arraySemObj];
                          });
                        }
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
                        const filteredProducts = cart.filter(clickedObject);

                        const clickedProduct = filteredProducts[0];

                        let quantity = null;

                        clickedProduct === undefined
                          ? (quantity = undefined)
                          : (quantity = clickedProduct.qtd);

                        if (quantity === undefined) {
                          setCart((prev_cart) => [
                            ...prev_cart,
                            { id: prod.id, qtd: 1 },
                          ]);
                        } else {
                          setCart((prev_cart) => {
                            const obj = {
                              ...prev_cart.filter(clickedObject)[0],
                            };
                            obj.qtd++;

                            const arraySemObj =
                              prev_cart.filter(notClickedObject);

                            return [...arraySemObj, obj];
                          });
                        }
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
                                className="Button"
                                disabled={
                                  cart.filter(clickedObject)[0]?.qtd <= 0 ||
                                  cart.filter(clickedObject)[0]?.qtd ===
                                    undefined
                                }
                              >
                                -
                              </button>
                              <div>
                                {cart.filter(clickedObject)[0]?.qtd || 0}
                              </div>
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
      </div>
    );
  }
};

export default Home;
