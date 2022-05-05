import PropTypes from "prop-types";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

function OpenList({
  onClick,
  className,
  backgroundColor = "black",
  size = "medium",
  color = "white",
  borderRadius = 10,
  width = "100%",
}) {
  let scale = 1;
  if (size === "small") scale = 0.5;
  if (size === "large") scale = 1.5;

  const style = {
    backgroundColor,
    padding: `${scale * 0.5}rem ${scale * 1}rem`,
    border: "none",
    color,
    borderRadius,
    width,
  };

  return (
    <button className={className} onClick={onClick} style={style}>
      <MenuRoundedIcon className="butText" margin="3px" />
    </button>
  );
}

OpenList.propTypes = {
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
};

export default OpenList;
