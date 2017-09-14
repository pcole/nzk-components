import * as Vibrant from 'node-vibrant'
import Color from 'color'

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

    let color = new Color(getColorFromPalette(palette))

    if (color.luminosity() < 0.1) {
      color = new Color([65, 74, 76])
    } else if (color.luminosity() > 0.9) {
      color = new Color([240, 240, 240])
    }

    cache.unshift({ url, color: color.rgb().array() })

    if (cache.length > 10) {
      cache.pop()
    }

    saveCacheToStore(cache)

    callback(null, color.rgb().array())
  })
}

export function getCacheFromStore () {
  let cache = window.localStorage.getItem('nzk-image-color-cache')

  return cache ? JSON.parse(cache) : []
}

export function saveCacheToStore (cache = []) {
  window.localStorage.setItem('nzk-image-color-cache', JSON.stringify(cache))
}

function getColorFromPalette (palette) {
  const paletteArray = []

  for (let key in palette) {
    if (palette[key]) {
      paletteArray.push(palette[key])
    }
  }

  let candidates = paletteArray.sort((a, b) => {
    return b.population - a.population
  }).slice(0, 3)

  for (let i = 0; i < candidates.length; i++) {
    candidates[i].lum = (new Color(candidates[i].getRgb())).luminosity()
  }

  let selected = candidates.sort((a, b) => {
    return Math.abs(0.5 - a.lum) - Math.abs(0.5 - b.lum)
  }).slice(0, 1)[0]

  return selected.getRgb()
}
