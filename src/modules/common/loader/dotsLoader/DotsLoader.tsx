const DotsLoader = () => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Cargando"
    className="grid place-content-center h-screen"
  >
    <div className="flex gap-2">
      <span className="sr-only">Cargando</span>
      <span className="w-2.5 h-2.5 rounded-full bg-brand/60 animate-pulse [animation-delay:-0.2s]" />
      <span className="w-2.5 h-2.5 rounded-full bg-brand/60 animate-pulse [animation-delay:-0.1s]" />
      <span className="w-2.5 h-2.5 rounded-full bg-brand/60 animate-pulse" />
    </div>
  </div>
);

export default DotsLoader;
