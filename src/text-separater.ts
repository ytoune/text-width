import { InseparableError } from './inseparable-error'
import { parseForHankaku } from './parse-for-hankaku'

type Char =
	| Readonly<{ type: 'hankaku'; char: string; width: number }>
	| Readonly<{ type: 'zenkaku'; char: string; width: number }>
	| Readonly<{ type: 'emoji'; url: string; char: string; width: 2 }>

export const createTextSeparater = (text: string) => {
	const chars = parseForHankaku(text).flatMap((part): Char[] =>
		'emoji' === part.type
			? [{ ...part, char: part.text }]
			: part.chars.map(c => ({ type: part.type, ...c })),
	)
	const modifyChars = (fn: (chars: Char[]) => void) => {
		fn(chars)
	}
	const texts: string[] = []
	let idx = 0
	const done = () => !chars[idx]
	const addSize = (size: number): number => {
		let text = ''
		let tmp = size
		for (; 0 < tmp; ++idx) {
			const c = chars[idx]
			if (!c) break
			tmp -= c.width
			text += c.char
			if (tmp < 0) throw new InseparableError()
		}
		texts.push(text)
		return size - tmp
	}
	const rest = () => {
		let text = ''
		let size = 0
		for (; ; ++idx) {
			const c = chars[idx]
			if (!c) break
			text += c.char
			size += c.width
		}
		return { text, size } as const
	}
	return { texts, addSize, done, rest, modifyChars } as const
}
