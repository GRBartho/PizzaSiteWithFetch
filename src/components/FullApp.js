import { React, useState } from "react";
import { WhiteC } from "../stories/Icons/CartButton.stories";
import { WhiteR } from "../stories/Icons/RefreshButton.stories";
import { Button } from "@mui/material";
import { WhiteBackButton } from "../stories/Icons/BackButton.stories";
import { DarkBar } from "../stories/Bar.stories";
import { Red } from "../stories/Produto.stories";
import { DarkOpenList } from "../stories/OpenList.stories";
import { Add, Take } from "../stories/Icons/Button.stories";
import Delete from "@mui/icons-material/Delete";

export function FullApp({
  backgroundColor = "#D9B48F",
  display = "flex",
  flexDirection = "column",
}) {
  const style = {
    backgroundColor,
    display,
    flexDirection,
  };

  const [page, setPage] = useState("home");
  const [opened, setOpened] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const listaProd = [
    {
      id: 1,
      descricao: "Broto",
      item_filho: false,
      item_pai: true,
      valor_venda: 20,
      cod_pai: null,
    },
    {
      id: 2,
      descricao: "Broto (1 Sabor)",
      item_filho: true,
      item_pai: false,
      valor_venda: 20,
      cod_pai: 1,
    },
    {
      id: 3,
      descricao: "Media",
      item_filho: false,
      item_pai: true,
      valor_venda: 30,
      cod_pai: null,
    },
    {
      id: 4,
      descricao: "Media (1 Sabor)",
      item_filho: true,
      item_pai: false,
      valor_venda: 30,
      cod_pai: 3,
    },
    {
      id: 5,
      descricao: "Media (2 Sabores)",
      item_filho: true,
      item_pai: false,
      valor_venda: 30,
      cod_pai: 3,
    },
    {
      id: 6,
      descricao: "Grande",
      item_filho: false,
      item_pai: true,
      valor_venda: 40,
      cod_pai: null,
    },
    {
      id: 7,
      descricao: "Grande (1 Sabor)",
      item_filho: true,
      item_pai: false,
      valor_venda: 40,
      cod_pai: 6,
    },
    {
      id: 8,
      descricao: "Grande (2 Sabores)",
      item_filho: true,
      item_pai: false,
      valor_venda: 30,
      cod_pai: 6,
    },
    {
      id: 9,
      descricao: "Grande (3 Sabores)",
      item_filho: true,
      item_pai: false,
      valor_venda: 40,
      cod_pai: 6,
    },
  ];

  const parentFilter = (o) => o.item_pai === true && o.valor_venda > 0;
  const childFilter = (o) => o.item_filho === true && o.valor_venda > 0;

  function refresh() {
    window.location.reload(false);
  }

  return (
    <div style={style}>
      <DarkBar {...DarkBar.args}>
        {page === "home" && (
          <div>
            <Button onClick={() => refresh()}>
              <WhiteR {...WhiteR.args} />
            </Button>
            <Button onClick={() => setPage("cart")}>
              <WhiteC {...WhiteC.args} />
            </Button>
            {cart.length}
          </div>
        )}
        {page === "cart" && (
          <div>
            <Button onClick={() => setPage("home")}>
              <WhiteBackButton />
            </Button>
          </div>
        )}
      </DarkBar>
      <img
        size="100%"
        src="https://thumbs.dreamstime.com/b/italian-pizza-fresh-salad-red-wine-wide-composition-party-dinner-flat-lay-various-kinds-glasses-over-rustic-wooden-table-174281796.jpg"
      />
      <DarkBar {...DarkBar.args}>
        <img
          src="https://www.imagensempng.com.br/wp-content/uploads/2021/02/20-2.png"
          height="50px"
          width="50px"
        />
      </DarkBar>
      {page === "home" && (
        <div>
          <div className="Product">
            {listaProd.filter(parentFilter).map((parentProd) => {
              const func = () => {
                setOpened(parentProd.id === opened ? null : parentProd.id);
              };
              return (
                <Red className="IndividualProducts">
                  <p className="ProductTitle">Pizza {parentProd.descricao}</p>
                  <div className="OpenBtn">
                    <DarkOpenList
                      {...DarkOpenList.args}
                      className="OpenList"
                      onClick={func}
                    />
                  </div>
                  {opened === parentProd.id && (
                    <div
                      className="ChildProducts"
                      style={{
                        backgroundColor: "#232323",
                        borderRadius: 15,
                        minWidth: "100%",
                        margin: 5,
                      }}
                    >
                      {listaProd.filter(childFilter).map((childProd) => {
                        const prod = listaProd.filter(
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
                            <div
                              style={{
                                display: "flex",
                                margin: 10,
                                alignItems: "center",
                              }}
                            >
                              <div
                                className="ChildName"
                                style={{
                                  flex: 1,
                                  display: "flex",
                                }}
                              >
                                <p className="ChildText">
                                  Pizza {childProd.descricao}
                                </p>
                                <Take
                                  {...Take.args}
                                  onClick={decrease}
                                  disabled={
                                    cart.filter(clickedObject)[0]?.qtd <= 0 ||
                                    cart.filter(clickedObject)[0]?.qtd ===
                                      undefined
                                  }
                                />
                                <p>{cart.filter(clickedObject)[0]?.qtd || 0}</p>
                                <Add
                                  {...Add.args}
                                  onClick={increase}
                                  disabled={
                                    cart.filter(clickedObject)[0]?.qtd >= 20
                                  }
                                />
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </Red>
              );
            })}
          </div>
        </div>
      )}
      {page === "cart" && (
        <div className="All">
          <div>
            <div className="Cart">
              {cart.map((cart_prod) => {
                const prod = listaProd.filter((o) => o.id === cart_prod.id);

                const deletePrice = () => {
                  console.log(cart_prod.qtd + " " + prod[0].valor_venda);
                  setTotalPrice(
                    (prev_price) =>
                      prev_price - cart_prod.qtd * prod[0].valor_venda
                  );
                };

                const deleteFromCart = () => {
                  setCart((prev_cart) => {
                    const cart_sem_obj = prev_cart.filter(
                      (o) => o.id !== prod[0].id
                    );

                    return [...cart_sem_obj];
                  });
                };

                const del = () => {
                  deletePrice();
                  deleteFromCart();
                };

                return (
                  <div>
                    <Red {...Red.args}>
                      <p>
                        {cart_prod.qtd}x {prod[0].descricao}
                        <Button onClick={del} style={{ color: "white" }}>
                          <Delete />
                        </Button>
                      </p>
                    </Red>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div>
        <DarkBar {...DarkBar.args} flexDirection="row">
          <p>Total: R$ {totalPrice}</p>
        </DarkBar>
      </div>
    </div>
  );
}

export default FullApp;
