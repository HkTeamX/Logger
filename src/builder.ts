import type { LoggerOptions } from './types.js'
import { Logger } from './logger.js'

const loggers = new Map<string, Logger>()

export function createLogger(name: string, options: LoggerOptions): Logger {
  const logger = new Logger(options)
  loggers.set(name, logger)
  return logger
}

export function getLogger(name: string): Logger | undefined {
  return loggers.get(name)
}

export function hasLogger(name: string): boolean {
  return loggers.has(name)
}
