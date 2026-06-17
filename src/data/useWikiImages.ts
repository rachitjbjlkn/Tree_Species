import { useEffect, useRef, useState } from 'react'

interface ImageMap {
  [wikiTitle: string]: string
}

const WIKI_API = 'https://en.wikipedia.org/w/api.php'

function fetchBatch(titles: string[]): Promise<ImageMap> {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'pageimages',
    pithumbsize: '400',
    titles: titles.join('|'),
    format: 'json',
    origin: '*',
  })
  return fetch(`${WIKI_API}?${params}`)
    .then(r => r.json())
    .then(data => {
      const map: ImageMap = {}
      const pages = data.query?.pages ?? {}
      for (const page of Object.values(pages) as any[]) {
        if (page.thumbnail?.source) {
          map[page.title] = page.thumbnail.source
        }
      }
      return map
    })
}

export function useWikiImages(titles: string[]) {
  const [images, setImages] = useState<ImageMap>({})
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    const batches: string[][] = []
    for (let i = 0; i < titles.length; i += 50) {
      batches.push(titles.slice(i, i + 50))
    }

    Promise.all(batches.map(fetchBatch)).then(results => {
      setImages(Object.assign({}, ...results))
    })
  }, [titles])

  return images
}
