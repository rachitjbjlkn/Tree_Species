import { useState } from 'react'
import species from '../data/treeSpecies'
import { useWikiImages } from '../data/useWikiImages'

const PLACEHOLDER = 'https://picsum.photos/seed/tree/400/300'

export default function TreeSpeciesGrid() {
  const [visible, setVisible] = useState(20)
  const titles = species.map(s => s.wikiTitle)
  const wikiImages = useWikiImages(titles)
  const loadMore = () => setVisible(p => Math.min(p + 20, species.length))

  return (
    <section id="species" className="py-24 px-5 sm:px-10 md:px-16 bg-gradient-to-b from-stone-900 to-stone-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair italic text-white mb-4">
            1,000+ Tree Species
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            Explore our comprehensive catalog of tree species from around the world.
            Each species tells a unique story of adaptation and survival.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {species.slice(0, visible).map((s) => (
            <div
              key={s.id}
              className="group bg-stone-800/50 rounded-2xl overflow-hidden border border-stone-700/50 hover:border-[#e8702a]/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30"
            >
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(s.wikiTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-[4/3] overflow-hidden"
              >
                <img
                  src={wikiImages[s.wikiTitle] || PLACEHOLDER}
                  alt={s.commonName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </a>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white text-lg font-semibold leading-tight">{s.commonName}</h3>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(s.wikiTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 mt-1 text-stone-500 hover:text-[#e8702a] transition-colors"
                    title="View on Wikipedia"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
                <p className="text-stone-400 text-sm italic mt-0.5 mb-2">{s.scientificName}</p>
                <p className="text-stone-300 text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {visible < species.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
            >
              Load More ({species.length - visible} remaining)
            </button>
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-stone-500 text-sm">
            Showing {Math.min(visible, species.length)} of {species.length} species
          </p>
        </div>
      </div>
    </section>
  )
}
