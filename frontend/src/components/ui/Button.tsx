import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

interface LinkButtonProps extends BaseButtonProps {
  to: string;
  href?: never;
}

interface AnchorButtonProps extends BaseButtonProps {
  href: string;
  to?: never;
}

interface NativeButtonProps extends BaseButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  to?: never;
  href?: never;
}

type ButtonProps = LinkButtonProps | AnchorButtonProps | NativeButtonProps;

const getClassName = (variant: ButtonVariant, fullWidth?: boolean) =>
  `button button--${variant}${fullWidth ? " button--full-width" : ""}`;

function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const className = getClassName(variant, props.fullWidth);

  if (typeof props.to === "string") {
    return (
      <Link className={className} to={props.to}>
        {props.children}
      </Link>
    );
  }

  if (typeof props.href === "string") {
    return (
      <a className={className} href={props.href}>
        {props.children}
      </a>
    );
  }

  return (
    <button
      className={className}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
