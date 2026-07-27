import type { ReactNode } from "react";
import "./Card.css";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return <article className={`card${className ? ` ${className}` : ""}`}>{children}</article>;
}

export default Card;
