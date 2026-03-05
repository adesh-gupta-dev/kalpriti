export function ResizableDivider({ onPointerDown }) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className="relative hidden w-2 cursor-col-resize bg-transparent lg:block"
      onPointerDown={onPointerDown}
    >
      <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-ink/20" />
    </div>
  );
}
