import { Menu, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Container from "../ui/Container";
import "./Header.css";

const navItems = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Demo", href: "#demo" },
];

function Header() {
  return (
    <header className="public-header">
      <Container className="public-header__inner">
        <Link className="public-header__brand" to="/" aria-label="Ir al inicio de FinanceAI">
          <span className="public-header__brand-mark">
            <Sparkles size={18} aria-hidden="true" />
          </span>
          <span>FinanceAI</span>
        </Link>

        <nav className="public-header__nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="public-header__actions">
          <Button to="/analisis/nuevo">Comenzar análisis</Button>
          <button className="public-header__menu" type="button" aria-label="Abrir navegación">
            <Menu size={20} />
          </button>
        </div>
      </Container>
    </header>
  );
}

export default Header;
