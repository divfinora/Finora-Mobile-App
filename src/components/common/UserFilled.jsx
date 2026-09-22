import React from "react";
import Svg, {
  Circle,
  Path,
} from "react-native-svg";

const UserFilled = ({
  size = 42,
  color = "#F47C2C",
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Head */}
      <Circle
        cx="12"
        cy="7"
        r="4"
        fill={color}
      />

      {/* Body */}
      <Path
        d="M4 21C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21H4Z"
        fill={color}
      />
    </Svg>
  );
};

export default UserFilled;