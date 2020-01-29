/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multi-assign */
//
// Allowing multiple misspellings at the cost of alower search
// https://stackoverflow.com/a/23305385
//
// NOTE: if search is too slow for large shops, consider a stricter match faster alternative:
// https://github.com/farzher/fuzzysort
// https://stackoverflow.com/a/46030494
//
const getBigrams = (str: string): string[] => {
  const s = str.toLowerCase()
  const v: string[] = Array.from({ length: s.length - 1 })
  const uref = v.length
  let i: number
  let ui: number
  for (i = ui = 0; ui <= uref; i = ui += 1) {
    v[i] = s.slice(i, i + 2)
  }
  return v
}
export const stringSimilarity = (str1: string, str2: string): number => {
  if (str1.length > 0 && str2.length > 0) {
    const pairs1 = getBigrams(str1)
    const pairs2 = getBigrams(str2)
    const _len = pairs1.length
    const _len1 = pairs2.length
    let hit_count = 0
    let ui: number
    let _j: number
    for (ui = 0; ui < _len; ui++) {
      for (_j = 0; _j < _len1; _j++) {
        if (pairs1[ui] === pairs2[_j]) {
          hit_count++
        }
      }
    }
    if (hit_count > 0) {
      return (2.0 * hit_count) / (pairs1.length + pairs2.length)
    }
  }
  return 0.0
}
