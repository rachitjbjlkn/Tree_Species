import { useState } from 'react'

const navItems = [
  { label: 'Catalog', section: 'species' },
  { label: 'Guides', section: 'guides' },
  { label: 'About', section: 'geology' },
  { label: 'Plans', section: 'plans' },
  { label: 'Tour', section: 'tour' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  const scrollTo = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span
            className="text-white text-xl sm:text-2xl font-playfair cursor-pointer"
            onClick={() => scrollTo('geology')}
          >
            Lithos
          </span>
        </div>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.section)}
              className={
                i === 0
                  ? 'text-white px-4 py-1.5 rounded-full text-sm font-medium'
                  : 'text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium'
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[90] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute top-20 left-4 right-4 bg-stone-900/95 backdrop-blur-xl border border-stone-700/50 rounded-2xl p-4 shadow-2xl">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.section)}
                className="block w-full text-left text-white text-lg font-medium px-4 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
