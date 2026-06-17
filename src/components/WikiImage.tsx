import { useEffect, useState, useRef } from 'react'

const FALLBACK = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#2d2d2d" width="400" height="300"/><text x="200" y="140" text-anchor="middle" fill="#666" font-family="sans-serif" font-size="16">Plant image</text></svg>`
)}`

interface Props {
  title: string
  alt: string
  className?: string
}

export default function WikiImage({ title, alt, className = '' }: Props) {
  const [src, setSrc] = useState<string | null>(null)
  const [errored, setErrored] = useState(false)
  const fetching = useRef(false)

  useEffect(() => {
    if (fetching.current) return
    fetching.current = true

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then(r => r.json())
      .then(data => {
        const url = data?.thumbnail?.source
        if (url) {
          setSrc(url.replace('http://', 'https://'))
        } else {
          setSrc(FALLBACK)
        }
      })
      .catch(() => setSrc(FALLBACK))
  }, [title])

  if (!src) {
    return <div className={`${className} bg-stone-700 animate-pulse`} />
  }

  return (
    <img
      src={errored ? FALLBACK : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (!errored) {
          setErrored(true)
          setSrc(FALLBACK)
        }
      }}
    />
  )
}
