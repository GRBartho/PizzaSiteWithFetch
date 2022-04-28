import React from "react";
import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";

function Cart() {
  return (
    <div className="All">
      <div className="TopBar">
        <p className="IndicadorCarrinho">
          <a href="/">
            <KeyboardReturnRoundedIcon />
          </a>
        </p>
      </div>
    </div>
  );
}

export default Cart;
