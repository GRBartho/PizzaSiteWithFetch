import PropTypes from "prop-types";

function Button({
  label,
  backgroundColor = "red",
  size = "medium",
  onClick,
  color = "white",
  borderRadius = 15,
  fontWeight = 900,
  margin = 10,
  disabled = false,
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
    fontWeight,
    margin,
  };

  return (
    <button
      className="AddTake"
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  onClick: PropTypes.func,
  color: PropTypes.string,
  borderRadius: PropTypes.number,
  margin: PropTypes.number,
  disabled: PropTypes.bool,
};

export default Button;
