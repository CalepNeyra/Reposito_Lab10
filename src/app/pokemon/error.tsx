'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md backdrop-blur-md">
        <h2 className="text-3xl font-bold text-red-400 mb-4">
          ¡Algo salió mal!
        </h2>
        <p className="text-gray-300 mb-6">
          {error.message || 'Error al cargar los datos de Pokémon.'}
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}