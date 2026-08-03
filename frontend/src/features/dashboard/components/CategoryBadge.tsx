import { getCategoryColor } from "./categoryColors";
import "./CategoryBadge.css";

interface CategoryBadgeProps {
  category: string;
}

function CategoryBadge({ category }: CategoryBadgeProps) {
  const color = getCategoryColor(category);

  return (
    <span
      className="category-badge"
      style={{ color, background: `color-mix(in srgb, ${color} 16%, transparent)` }}
    >
      {category}
    </span>
  );
}

export default CategoryBadge;
