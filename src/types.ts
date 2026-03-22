import type { Formatter as ColorFormatter } from 'picocolors/types.js'
import type { Logger } from './logger.js'

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

  transformers?: Transformer[]
  colors?: LogColors
  names?: LogNames
}

/**
 * 格式化器类型
 */
export type Transformer = (context: { logger: Logger, level: LogLevelType }, ...args: unknown[]) => string[]
