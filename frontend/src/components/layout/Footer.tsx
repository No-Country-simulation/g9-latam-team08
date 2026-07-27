import Container from "../ui/Container";
import "./Footer.css";

function Footer() {
  return (
    <footer className="public-footer">
      <Container className="public-footer__inner">
        <div className="public-footer__top">
          <nav className="public-footer__nav" aria-label="Navegación secundaria">
            <a href="/">Inicio</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#demo">Demo</a>
          </nav>
          <p>© 2026 FinanceAI · G9-LATAM-Team08 · NoCountry</p>
        </div>

        <p className="public-footer__notice">
          La información generada es orientativa y no reemplaza asesoramiento financiero
          profesional.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
