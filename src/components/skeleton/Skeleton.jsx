import "./Skeleton.css";

const Skeleton = ({
  variant = "text",
  width,
  height,
  radius,
  className = "",
  style,
}) => {
  return (
    <div
      className={`skeleton skeleton--${variant} ${className}`.trim()}
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
};

export default Skeleton;
