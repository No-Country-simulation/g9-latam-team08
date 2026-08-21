import "./RouteContentFallback.css";

interface RouteContentFallbackProps {
  message: string;
  compact?: boolean;
  fullScreen?: boolean;
}

function RouteContentFallback({
  message,
  compact = false,
  fullScreen = false,
}: RouteContentFallbackProps) {
  return (
    <div
      className={`route-fallback${compact ? " route-fallback--compact" : ""}${
        fullScreen ? " route-fallback--fullscreen" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="route-fallback__pulse" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default RouteContentFallback;
