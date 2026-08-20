// Paleta derivada de los tokens existentes: tokens.css no define un color por categoría,
// así que se reutilizan los tokens semánticos disponibles de forma cíclica.
// La asignación queda "cacheada" por nombre de categoría (primera vez que se ve, gana un color)
// para que el mismo color se mantenga estable sin importar en qué componente se use primero
// (ExpensesByCategoryCard, CategoryBadge, o cualquier futuro consumidor).
const CATEGORY_COLOR_PALETTE = [
  "var(--color-primary)",
  "var(--color-positive)",
  "var(--color-warning)",
  "var(--color-secondary)",
  "var(--color-error)",
];

const categoryColorCache = new Map<string, string>();

export function getCategoryColor(category: string): string {
  const cachedColor = categoryColorCache.get(category);
  if (cachedColor) {
    return cachedColor;
  }

  const color = CATEGORY_COLOR_PALETTE[categoryColorCache.size % CATEGORY_COLOR_PALETTE.length];
  categoryColorCache.set(category, color);
  return color;
}
