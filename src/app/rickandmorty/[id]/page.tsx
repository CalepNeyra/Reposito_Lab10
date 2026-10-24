import Image from 'next/image';
import Link from 'next/link';
import { Character, RickAndMortyResponse } from '@/types/rickandmorty';

interface Props {
  params: Promise<{ id: string }>;
}

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 },
  });

  if (!res.ok) throw new Error('Personaje no encontrado');
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const data: RickAndMortyResponse = await res.json();

  return data.results.map((char) => ({
    id: char.id.toString(),
  }));
}

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = await params;
  const char = await getCharacter(id);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Luz Portal de fondo */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10">
        <Link
          href="/rickandmorty"
          className="inline-flex items-center gap-2 mb-8 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-green-400/50 px-5 py-2.5 rounded-xl text-green-400 text-sm font-semibold transition-all duration-300 shadow-lg"
        >
          ← Regresar al Multiverso
        </Link>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Avatar del Sujeto */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-green-500/30 shadow-[0_0_30px_rgba(74,222,128,0.15)]">
            <Image
              src={char.image}
              alt={char.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Expediente Técnico */}
          <div>
            <div className="inline-block bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono px-3 py-1 rounded-full mb-3">
              SUJETO #{char.id}
            </div>
            <h1 className="text-3xl font-black text-white mb-2">{char.name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  char.status === 'Alive'
                    ? 'bg-green-400 shadow-[0_0_10px_#4ade80]'
                    : char.status === 'Dead'
                    ? 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                    : 'bg-gray-400'
                }`}
              />
              <span className="text-sm font-medium text-slate-300">
                {char.status} — {char.species}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                <span className="text-slate-500 block font-mono uppercase mb-1">Género</span>
                <span className="font-semibold text-slate-200">{char.gender}</span>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                <span className="text-slate-500 block font-mono uppercase mb-1">Tipo</span>
                <span className="font-semibold text-slate-200 truncate block">{char.type || 'N/A'}</span>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl col-span-2">
                <span className="text-slate-500 block font-mono uppercase mb-1">Origen</span>
                <span className="font-semibold text-slate-200">{char.origin.name}</span>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl col-span-2">
                <span className="text-slate-500 block font-mono uppercase mb-1">Ubicación Actual</span>
                <span className="font-semibold text-slate-200">{char.location.name}</span>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                <span className="text-slate-500 block font-mono uppercase mb-1">Episodios</span>
                <span className="font-semibold text-green-400">{char.episode.length} apariciones</span>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                <span className="text-slate-500 block font-mono uppercase mb-1">Registro</span>
                <span className="font-semibold text-slate-200">
                  {new Date(char.created).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}