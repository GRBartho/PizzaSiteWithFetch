import PropTypes from "prop-types";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

function RefreshButton({
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
    <RefreshRoundedIcon
      className="RefreshButton"
      onClick={onClick}
      style={style}
    />
  );
}

RefreshButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  onClick: PropTypes.func,
  color: PropTypes.string,
  margin: PropTypes.number,
};

export default RefreshButton;
