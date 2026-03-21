import type { Formatter as ColorFormatter } from 'picocolors/types.js'

export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
} as const

export type LogLevelType = typeof LogLevel[keyof typeof LogLevel]

export type LogColors = { [key in LogLevelType]: ColorFormatter }
export type LogNames = { [key in LogLevelType]: string }

export interface LoggerOptions {
  enable?: boolean
  title: string
  level?: LogLevelType

  formatters?: Formatter[]
  colors?: LogColors
  names?: LogNames
}

/**
 * 格式化器类型
 */
export type Formatter = (...args: unknown[]) => string[]
