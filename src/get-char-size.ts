import easta from 'easta'

import { UnicodeData } from './gen/unicode-data'

export const getSize = (c: string, isCjk: boolean): 0 | 1 | 2 => {
	const w = easta(c)
	const k = c.codePointAt(0)
	if (!k) return 0
	const w2 = UnicodeData[k as unknown as keyof typeof UnicodeData]
	if ('Me' === w2 || 'Mn' === w2 || 'Cf' === w2 || 'Cc' === w2) return 0
	if ('Cs' === w2) return 2
	if ('F' === w || 'W' === w) return 2
	if ('A' === w) return isCjk ? 2 : 1
	if ('N' === w && ('Zl' === w2 || 'Zp' === w2)) return 1
	return 1
}
