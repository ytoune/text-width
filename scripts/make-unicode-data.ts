import { fetch } from 'cross-fetch'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'

const fetchUnicodeData = async () => {
	const fetchText = async (uri: string) =>
		await fetch(uri).then(async (r): Promise<string> => await r.text())
	const UnicodeData = await fetchText(
		'https://www.unicode.org/Public/UNIDATA/UnicodeData.txt',
	).then(t =>
		Object.fromEntries(
			t
				.split('\n')
				.map(t => t.trim().split(';'))
				.filter(t => t[0] && t[2])
				.map((t): [number, string] => [parseInt(t[0] ?? '', 16), t[2] ?? '']),
		),
	)
	return UnicodeData
}

const gen = async () => {
	const targetDir = join(__dirname, '../src/gen')
	const targetFile = join(targetDir, 'unicode-data.ts')
	const UnicodeData = await fetchUnicodeData()
	await mkdir(targetDir, { recursive: true })
	await writeFile(
		targetFile,
		`export const UnicodeData = ${JSON.stringify(UnicodeData)} as const\n`,
	)
}

gen().catch(x => {
	console.error(x)
})
