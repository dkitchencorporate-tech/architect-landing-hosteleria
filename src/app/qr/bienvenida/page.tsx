import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pago confirmado | DKitchen',
  robots: { index: false, follow: false },
};

export default function BienvenidaQr() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mx-auto mb-6">
          ✓
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Pago confirmado</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Estamos aprovisionando tu cuenta ahora mismo. En unos minutos recibirás un correo para fijar tu
          contraseña y entrar a tu panel — desde ahí montas tu carta y descargas tu QR.
        </p>
        <p className="text-gray-500 text-sm mb-10">
          Si no ves el correo en 10 minutos, revisa spam o escríbenos por WhatsApp y lo resolvemos al momento.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/34622652659?text=Hola,%20acabo%20de%20activar%20mi%20QR%20Men%C3%BA%20y%20tengo%20una%20duda."
            className="inline-flex justify-center bg-gray-900 text-white px-6 py-3.5 rounded-full font-bold hover:bg-black transition-colors"
          >
            Escribir por WhatsApp
          </a>
          <Link
            href="/"
            className="inline-flex justify-center border-2 border-gray-200 text-gray-700 px-6 py-3.5 rounded-full font-bold hover:border-gray-400 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
