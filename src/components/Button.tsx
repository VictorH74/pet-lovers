interface Props {
  children: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<Props> = (props) => (
  <button
    type={props.type}
    onClick={props.onClick}
    className={`bg-custom-blue text-white uppercase px-10 py-3 rounded-md  ${
      props.className || ""
    }`}
  >
    {props.children}
  </button>
);

export default Button;
