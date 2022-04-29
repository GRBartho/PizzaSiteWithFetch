import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart({ cart, list, setTotalPrice, setCart }) {
  return (
    <div className="All">
      <div>
        <div className="Cart">
          {cart.map((cart_prod) => {
            const prod = list.filter((o) => o.id === cart_prod.id);

            const deletePrice = () => {
              console.log(cart_prod.qtd + " " + prod[0].valor_venda);
              setTotalPrice(
                (prev_price) => prev_price - cart_prod.qtd * prod[0].valor_venda
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
              <div className="cartWithProds">
                <p className="CartText">
                  <img className="cartIMG" src={prod[0].url_imagem} />
                  {cart_prod.qtd}x {prod[0].descricao}
                  <DeleteIcon onClick={del} className="delete" />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Cart;
