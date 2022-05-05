import PropTypes from "prop-types";

function Bar({
  children,
  className,
  backgroundColor = "red",
  size = "medium",
  color = "white",
  display = "flex",
  flexDirection,
  justifyContent = "center",
  height = 52,
  borderRadius = 0,
  margin = 5,
  flex = "column",
}) {
  let scale = 1;
  if (size === "small") scale = 0.5;
  if (size === "large") scale = 1.5;

  const style = {
    backgroundColor,
    padding: `${scale * 0.5}rem ${scale * 1}rem`,
    border: "none",
    color,
    display,
    flexDirection,
    justifyContent,
    height,
    borderRadius,
    margin,
    flex,
  };

  return (
    <div className={className} style={style} flexdirection={flexDirection}>
      {children}
    </div>
  );
}

Bar.propTypes = {
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
  children: PropTypes.object,
  flex: PropTypes.bool,
};

export default Bar;
