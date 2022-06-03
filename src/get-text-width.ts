import { parseForHankaku } from './parse-for-hankaku'

/**
 * 文字列の幅の計測
 */
export const getTextWidth = (str: string): number =>
	parseForHankaku(str).reduce((q, w) => q + w.width, 0)

/**
 * 文字列の幅の計測
 */
export const calcColumnWidth = getTextWidth
