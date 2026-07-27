import type { ReactNode } from "react";
import "./Container.css";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return <div className={`container${className ? ` ${className}` : ""}`}>{children}</div>;
}

export default Container;
