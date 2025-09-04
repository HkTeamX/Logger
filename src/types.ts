import type { Formatter as ColorFormatter } from 'picocolors/types.js'

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export type LogColors = { [key in LogLevel]: ColorFormatter }

export interface LoggerOptions {
  level?: LogLevel
  formatters?: Formatter[]
  colors?: LogColors
  title?: string
}

/**
 * 格式化器类型
 */
export type Formatter = (...args: unknown[]) => unknown[]
