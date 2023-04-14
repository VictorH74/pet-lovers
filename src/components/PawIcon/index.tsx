import React from "react";

interface Props {
  color?: string;
  size?: number;
  sx?: {
    color: string
  }
}

const PawIcon: React.FC<Props> = ({ color, size = 25, sx }) => {
  const defaultColor = color || sx?.color || "#D9D9D9"

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 129 103"
      fill="none"
    >
      <ellipse
        cx="46.9137"
        cy="22.7597"
        rx="12.7176"
        ry="21.196"
        transform="rotate(-8 46.9137 22.7597)"
        fill={defaultColor}
      />
      <ellipse
        cx="80.8272"
        cy="22.7596"
        rx="12.7176"
        ry="21.196"
        transform="rotate(8 80.8272 22.7596)"
        fill={defaultColor}
      />
      <ellipse
        cx="19.9885"
        cy="50.7631"
        rx="12.7176"
        ry="21.196"
        transform="rotate(-23 19.9885 50.7631)"
        fill={defaultColor}
      />
      <ellipse
        cx="109.011"
        cy="50.7631"
        rx="12.7176"
        ry="21.196"
        transform="rotate(23 109.011 50.7631)"
        fill={defaultColor}
      />
      <path
        d="M94.11 85.5849C94.11 101.974 71.5146 107.675 64.4357 95.8057C57.1014 107.675 34.7614 101.974 34.7614 85.5849C34.7614 69.1962 48.047 53.4138 64.4357 53.4138C80.8244 53.4138 94.11 69.1962 94.11 85.5849Z"
        fill={defaultColor}
      />
    </svg>
  );
};

export default PawIcon;
