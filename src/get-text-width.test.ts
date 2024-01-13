import { describe, it, expect } from 'vitest'
import { getTextWidth } from './get-text-width'

describe('getTextWidth', () => {
  const list: [string, number, string?][] = [
    ['たとえば、 👍🏻 は 2 文字で 👨‍👩‍👧‍👦 は 7 文字と', 40],
    ['ずべ゙での゙文゙字゙に゙濁゙゙点゙を゙づげよ゙ゔ', 28],
    ['すべての文字に濁点をつけよう', 28],
    ['abcdef'.repeat(6), 36],
    ['ﾎｹﾞﾎｹﾞﾎｹﾞホゲホゲ', 17],
    ['ÀÁÂÃÄÅ', 6],
    ['ÀÁÂÃÄÅᰂᰃᰄᰅᰆᰇᰈᰉᰊᰋᰌᰍᰎ', 19],
    ['ﾋ゙ﾟ゙ﾖ゙ﾋ゙ﾟ゙ﾖ゙ﾋ゙ﾟ゙ﾖ゙', 9],
    ['', 0, 'empty text'],
    [
      'ずべ゙での゙文゙字゙に゙濁゙゙点゙を゙づげよ゙ゔ'.repeat(10),
      280,
      'long1',
    ],
    ['すべての文字に濁点をつけよう'.repeat(10), 280, 'long2'],
  ]

  for (const [text, width, title] of list) {
    it(title || text, () => {
      expect(getTextWidth(text)).toBe(width)
    })
  }
})
