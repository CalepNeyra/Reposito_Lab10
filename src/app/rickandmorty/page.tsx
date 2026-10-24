'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Character } from '@/types/rickandmorty';

export default function RickAndMortyPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (status) params.append('status', status);
      if (type) params.append('type', type);
      if (gender) params.append('gender', gender);

      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`);
        if (!res.ok) {
          setCharacters([]);
        } else {
          const data = await res.json();
          setCharacters(data.results || []);
        }
      } catch {
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchCharacters, 300);
    return () => clearTimeout(timeout);
  }, [name, status, type, gender]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 p-6 md:p-12 relative overflow-hidden">
      {/* Resplandores de luz de fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 drop-shadow-[0_0_25px_rgba(74,222,128,0.3)]">
            RICK & MORTY
          </h1>
          <p className="text-slate-400 mt-2 text-sm tracking-widest uppercase font-semibold">
            Multiverse Explorer • CSR & ISR Lab
          </p>
        </header>

        {/* Panel de Filtros Neón */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl shadow-2xl mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 focus:border-green-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
          />

          <input
            type="text"
            placeholder="🏷️ Buscar por tipo..."
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 focus:border-green-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 focus:border-green-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all cursor-pointer"
          >
            <option value="">❤️ Todos los Estados</option>
            <option value="alive">Alive (Vivo)</option>
            <option value="dead">Dead (Muerto)</option>
            <option value="unknown">Unknown (Desconocido)</option>
          </select>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 focus:border-green-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all cursor-pointer"
          >
            <option value="">🧬 Todos los Géneros</option>
            <option value="female">Female (Femenino)</option>
            <option value="male">Male (Masculino)</option>
            <option value="genderless">Genderless (Sin género)</option>
            <option value="unknown">Unknown (Desconocido)</option>
          </select>
        </div>

        {/* Grilla de Tarjetas */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 text-sm animate-pulse">Escaneando dimensiones...</p>
          </div>
        ) : characters.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
            <p className="text-xl text-slate-400 font-medium">No se encontraron sujetos en este multiverso.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map((char) => (
              <Link
                key={char.id}
                href={`/rickandmorty/${char.id}`}
                className="group bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden hover:border-green-400/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_-10px_rgba(74,222,128,0.2)] flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-950">
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Badge de Estado Animado */}
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        char.status === 'Alive'
                          ? 'bg-green-400 shadow-[0_0_8px_#4ade80]'
                          : char.status === 'Dead'
                          ? 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                          : 'bg-gray-400'
                      }`}
                    />
                    {char.status}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors truncate">
                      {char.name}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {char.species} • <span className="text-slate-300">{char.gender}</span>
                    </p>
                  </div>

                  {char.type && (
                    <div className="mt-3 pt-3 border-t border-slate-800/60">
                      <span className="text-[10px] font-mono uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-md truncate block">
                        {char.type}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}