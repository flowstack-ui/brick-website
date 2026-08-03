export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand" role="img" aria-label="Brick UI">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      {!compact && <span className="brand-word">Brick</span>}
    </span>
  );
}
