import { InseparableError } from './inseparable-error'
import { createTextSeparater } from './text-separater'

describe('createTextSeparater', () => {
	it('ok', () => {
		const sep = createTextSeparater('たとえば、 👍🏻 は 2 文字で 👨‍👩‍👧‍👦 は 7 文字と')
		expect(sep.addSize(4)).toBe(4)
		expect(sep.texts).toEqual(['たと'])
		expect(() => sep.addSize(1)).toThrow(new InseparableError())
		expect(sep.addSize(6)).toBe(6)
		expect(sep.texts).toEqual(['たと', 'えば、'])
		expect(sep.addSize(11)).toBe(11)
		expect(sep.texts).toEqual(['たと', 'えば、', ' 👍🏻 は 2 文'])
		expect(sep.rest()).toEqual({ text: '字で 👨‍👩‍👧‍👦 は 7 文字と', size: 19 })
	})
	it('多めのサイズ', () => {
		const sep = createTextSeparater('ﾎｹﾞﾎｹﾞﾎｹﾞホゲホゲ')
		expect(sep.addSize(6)).toBe(6)
		expect(sep.texts).toEqual(['ﾎｹﾞﾎｹﾞ'])
		expect(sep.addSize(5)).toBe(5)
		expect(sep.texts).toEqual(['ﾎｹﾞﾎｹﾞ', 'ﾎｹﾞホ'])
		expect(sep.addSize(50)).toBe(6)
		expect(sep.texts).toEqual(['ﾎｹﾞﾎｹﾞ', 'ﾎｹﾞホ', 'ゲホゲ'])
		expect(sep.rest()).toEqual({ text: '', size: 0 })
	})
})
