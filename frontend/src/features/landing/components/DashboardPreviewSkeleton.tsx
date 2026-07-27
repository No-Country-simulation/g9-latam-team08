import Card from "../../../components/ui/Card";
import "./DashboardPreviewSkeleton.css";

function DashboardPreviewSkeleton() {
  return (
    <Card className="dashboard-preview" >
      <div className="dashboard-preview__sidebar">
        <span className="dashboard-preview__sidebar-brand skeleton-block" />
        <span className="skeleton-line skeleton-line--short" />
        <span className="skeleton-line skeleton-line--medium" />
        <span className="skeleton-line skeleton-line--short" />
      </div>

      <div className="dashboard-preview__content">
        <div className="dashboard-preview__hero-card">
          <span className="skeleton-chip" />
          <span className="skeleton-line skeleton-line--medium" />
          <span className="skeleton-line skeleton-line--short" />
          <div className="dashboard-preview__metrics">
            <span className="skeleton-metric" />
            <span className="skeleton-metric" />
            <span className="skeleton-metric" />
          </div>
        </div>

        <div className="dashboard-preview__bottom">
          <div className="dashboard-preview__panel">
            <span className="skeleton-line skeleton-line--medium" />
            <span className="skeleton-bar" />
            <span className="skeleton-bar skeleton-bar--wide" />
            <span className="skeleton-bar skeleton-bar--medium" />
          </div>

          <div className="dashboard-preview__panel">
            <span className="skeleton-line skeleton-line--medium" />
            <span className="skeleton-line" />
            <span className="skeleton-line skeleton-line--medium" />
            <span className="skeleton-line skeleton-line--short" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DashboardPreviewSkeleton;
