import "./SectionHeader.css";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={`section-header section-header--${align}`}>
      {eyebrow ? <span className="section-header__eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default SectionHeader;
