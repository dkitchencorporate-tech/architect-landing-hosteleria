/**
 * Bloque POWER-STATEMENT (DKITCHEN_MIGRATION_PLAN_PARTE6.md, Sección 1):
 * una sola frase corta, tipografía muy grande, fondo de acento distinto al
 * bloque anterior/siguiente. Sin bullets, sin explicación adicional — es una
 * respiración y un golpe de efecto, no una sección informativa.
 */
export default function PowerStatement({
  texto,
  fondo = 'brand',
}: {
  texto: string;
  fondo?: 'brand' | 'dark';
}) {
  const clasesFondo =
    fondo === 'brand'
      ? 'bg-brand text-white'
      : 'bg-dash-bg text-white';

  return (
    <section className={`${clasesFondo} py-20 md:py-28`}>
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <p className="text-3xl sm:text-4xl md:text-6xl font-black leading-[1.15] text-balance">
          {texto}
        </p>
      </div>
    </section>
  );
}
