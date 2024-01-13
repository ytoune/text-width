import * as parser from '@twemoji/parser'

import { getSize } from './get-char-size'

type Char = Readonly<{
  char: string
  width: number
}>

export type Part =
  | Readonly<{
      type: 'hankaku'
      value: string
      width: number
      chars: readonly Char[]
    }>
  | Readonly<{
      type: 'zenkaku'
      value: string
      width: number
      chars: readonly Char[]
    }>
  | Readonly<{
      type: 'emoji'
      text: string
      url: string
      width: 2
    }>

/**
 * 文字列から絵文字を切り出す
 */
export const parseForHankaku = (str: string): readonly Part[] => {
  const list = parser.parse(str)
  const res: Part[] = []
  let last = 0
  const push = (str: string) => {
    let last = null as null | {
      type: 'hankaku' | 'zenkaku'
      value: string
      width: number
      chars: Char[]
    }
    const list = str ? str.match(/[\s\S]/giu) : null
    if (!list) return
    for (const char of list) {
      const width = getSize(char, true)
      const type = 1 === width ? 'hankaku' : 'zenkaku'
      if (last?.type === type) {
        last.value += char
        last.width += width
        last.chars.push({ char, width })
      } else {
        const chars = [{ char, width }]
        res.push((last = { type, value: char, width, chars }))
      }
    }
  }
  for (const p of list) {
    push(str.substring(last, p.indices[0]))
    last = p.indices[1]
    res.push({ ...p, width: 2 })
  }
  push(str.substring(last))
  return res
}
