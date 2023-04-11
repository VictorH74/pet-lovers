import React from "react";

interface Props {
  size: number;
  className?: string;
  color?: string;
}
const AccountIcon: React.FC<Props> = ({
  size = 25,
  className = "",
  color = "#ffff",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 129 129"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="64.5" cy="64.5" r="62.5" stroke={color} stroke-width="4" />
    <circle
      cx="64.4977"
      cy="48.5771"
      r="16.9706"
      stroke={color}
      stroke-width="4"
    />
    <path
      d="M93.0468 95.6614C93.0468 80.4781 80.7383 68.1696 65.555 68.1696C50.3716 68.1696 38.0631 80.4781 38.0631 95.6614"
      stroke={color}
      stroke-width="4"
    />
  </svg>
);

export default AccountIcon;
