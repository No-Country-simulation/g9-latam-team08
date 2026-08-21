import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__card">
        <p className="not-found-page__eyebrow">404</p>
        <h1>Esta página no existe</h1>
        <p>Probablemente la ruta todavía no forme parte del MVP actual.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
