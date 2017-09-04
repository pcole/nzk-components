import * as Vibrant from 'node-vibrant'

// Extracts the primary color from an image at the given url
// Caches 10 results in localstorage for speed

export default function getColorFromImage (url, callback) {
  const cache = getCacheFromStore()

  let entry = cache.find(entry => entry.url === url)

  if (entry) {
    callback(null, entry.color)
    return
  }

  Vibrant.from(url).getPalette((err, palette) => {
    if (err) {
      callback(err)
      return
    }

    let selected

    for (let key in palette) {
      if (!selected || (palette[key] && selected.population < palette[key].population)) {
        selected = palette[key]
      }
    }

    const color = selected.getRgb()

    cache.unshift({ url, color })

    if (cache.length > 10) {
      cache.pop()
    }

    saveCacheToStore(cache)

    callback(null, color)
  })
}

export function getCacheFromStore () {
  let cache = window.localStorage.getItem('nzk-image-color-cache')

  return cache ? JSON.parse(cache) : []
}

export function saveCacheToStore (cache = []) {
  window.localStorage.setItem('nzk-image-color-cache', JSON.stringify(cache))
}
