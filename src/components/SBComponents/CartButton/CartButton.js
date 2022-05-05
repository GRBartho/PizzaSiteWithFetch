import PropTypes from "prop-types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function CartButton({
  onClick,
  color = "white",
  margin = 10,
  size = "medium",
}) {
  let scale = 1;
  if (size === "small") scale = 0.5;
  if (size === "large") scale = 1.5;

  const style = {
    color,
    margin,
    padding: `${scale * 0.5}rem ${scale * 1}rem`,
  };

  return (
    <ShoppingCartIcon className="CartButton" onClick={onClick} style={style} />
  );
}

CartButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  onClick: PropTypes.func,
  color: PropTypes.string,
  margin: PropTypes.number,
};

export default CartButton;
