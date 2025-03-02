import { shikiConfig } from 'astro.config.mts'
import { createShikiHighlighter } from '@astrojs/markdown-remark'

export default await createShikiHighlighter(shikiConfig)

export const languageNames = {
  sp: 'Catspeak',
  catspeak: 'Catspeak',
  jayspeak: 'JaySpeak',
  csv: "index.csv",
  gml: 'GML',
  rmml: '.md Mod',
  mini: 'INI File',
} as const

export type CodeLanguage = keyof typeof languageNames
