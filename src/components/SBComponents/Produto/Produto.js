import PropTypes from "prop-types";

function Produto({
  children,
  className,
  backgroundColor = "#A6192E",
  size = "medium",
  color = "white",
  borderRadius = 15,
  margin = 20,
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
    margin,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

Produto.propTypes = {
  margin: PropTypes.number,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
  borderRadius: PropTypes.number,
};

export default Produto;
