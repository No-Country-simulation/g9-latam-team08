import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import "./NewAnalysisPage.css";

function NewAnalysisPage() {
  return (
    <div className="placeholder-page">
      <Header />
      <main className="placeholder-page__main">
        <Container>
          <Card className="placeholder-page__card">
            <span className="placeholder-page__tag">Próximamente</span>
            <h1>Nuevo análisis</h1>
            <p>
              Esta pantalla queda preparada para el flujo interno del MVP. Acá vamos a cargar
              datos financieros y transacciones cuando definamos el formulario inicial.
            </p>
            <Button to="/">Volver al inicio</Button>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default NewAnalysisPage;
