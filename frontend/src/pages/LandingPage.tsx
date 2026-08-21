import { BrainCircuit, ChartNoAxesColumn, HandCoins } from "lucide-react";
import { useEffect } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import DashboardPreviewSkeleton from "../features/landing/components/DashboardPreviewSkeleton";
import FeatureCard from "../features/landing/components/FeatureCard";
import StepCard from "../features/landing/components/StepCard";
import "./LandingPage.css";

interface LandingPageProps {
  initialSection?: "demo";
}

const features = [
  {
    icon: ChartNoAxesColumn,
    title: "Clasificación automática de gastos",
    description: "Organizá tus transacciones por categoría.",
  },
  {
    icon: BrainCircuit,
    title: "Perfil de salud financiera",
    description: "Conocé tu situación actual con indicadores simples.",
  },
  {
    icon: HandCoins,
    title: "Recomendaciones personalizadas",
    description: "Recibí sugerencias claras para mejorar tus hábitos.",
  },
];

const steps = [
  {
    step: "1",
    title: "Cargás tus datos",
    description: "Ingresá ingresos, ahorro y deudas.",
  },
  {
    step: "2",
    title: "Agregás transacciones",
    description: "Sumá tus gastos recientes.",
  },
  {
    step: "3",
    title: "Recibís tu diagnóstico",
    description: "Visualizá tu perfil financiero, categorías y recomendaciones.",
  },
];

function LandingPage({ initialSection }: LandingPageProps) {
  useEffect(() => {
    if (initialSection !== "demo") {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const target = document.getElementById("demo");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [initialSection]);

  return (
    <div className="landing-page">
      <Header />
      <main>
        <section className="hero-section">
          <Container className="hero-section__inner">
            <div className="hero-section__content">
              <span className="hero-section__eyebrow">Asistente inteligente de salud financiera</span>
              <h1>Entendé tus finanzas con ayuda de IA</h1>
              <p>
                FinanceAI analiza tus ingresos, gastos y transacciones para mostrarte tu
                salud financiera, clasificar tus gastos y darte recomendaciones claras.
              </p>
              <div className="hero-section__actions">
                <Button to="/analisis/nuevo">Comenzar análisis</Button>
                <Button href="#demo" variant="secondary">
                  Ver demo
                </Button>
              </div>
              <p className="hero-section__notice">
                La información generada es orientativa y no reemplaza asesoramiento financiero
                profesional.
              </p>
            </div>
            <div className="hero-section__preview" id="demo">
              <DashboardPreviewSkeleton />
            </div>
          </Container>
        </section>

        <section className="landing-section" id="funcionalidades">
          <Container>
            <SectionHeader
              eyebrow="Funcionalidades"
              title="Una base clara para entender tu situación financiera"
              description="El MVP está pensado para ayudarte a ordenar información, revisar gastos y recibir una primera lectura de tu panorama financiero."
              align="center"
            />
            <div className="landing-grid landing-grid--features">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </Container>
        </section>

        <section className="landing-section landing-section--accent" id="como-funciona">
          <Container>
            <SectionHeader
              eyebrow="Cómo funciona"
              title="Tres pasos simples para empezar"
              description="Cargás tu información, sumás tus movimientos y recibís una lectura inicial para entender mejor tus hábitos."
              align="center"
            />
            <div className="landing-grid landing-grid--steps">
              {steps.map((step) => (
                <StepCard key={step.step} {...step} />
              ))}
            </div>
          </Container>
        </section>

        <section className="landing-section">
          <Container>
            <div className="landing-cta">
              <div>
                <p className="landing-cta__eyebrow">Empezá hoy</p>
                <h2>Empezá con tu primer análisis</h2>
                <p>
                  Cargá tus datos y obtené una visión clara de tu situación financiera.
                </p>
              </div>
              <Button to="/analisis/nuevo">Comenzar análisis</Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
