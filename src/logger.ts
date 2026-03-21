import type { LoggerOptions, LogLevelType } from './types.js'
import pc from 'picocolors'
import { defaultFormatter } from './formatter.js'
import { LogLevel } from './types.js'

export const defaultOptions: Required<Omit<LoggerOptions, 'title'>> = {
  enable: true,
  level: LogLevel.INFO,

  formatters: [defaultFormatter],
  colors: {
    [LogLevel.DEBUG]: pc.magenta,
    [LogLevel.INFO]: pc.blue,
    [LogLevel.WARN]: pc.yellow,
    [LogLevel.ERROR]: pc.red,
  },
  names: {
    [LogLevel.DEBUG]: 'DEBUG',
    [LogLevel.INFO]: 'INFO',
    [LogLevel.WARN]: 'WARN',
    [LogLevel.ERROR]: 'ERROR',
  },
}

export class Logger {
  options: Required<LoggerOptions>

  constructor(options: LoggerOptions) {
    this.options = {
      enable: options.enable ?? defaultOptions.enable,
      title: options.title,
      level: options.level ?? defaultOptions.level,
      formatters: options.formatters ?? defaultOptions.formatters,
      colors: options.colors ?? defaultOptions.colors,
      names: options.names ?? defaultOptions.names,
    }
  }

  clone(options: LoggerOptions): Logger {
    return new Logger({
      ...this.options,
      ...options,
    })
  }

  DEBUG(...messages: unknown[]): void {
    this.print(LogLevel.DEBUG, ...messages)
  }

  INFO(...messages: unknown[]): void {
    this.print(LogLevel.INFO, ...messages)
  }

  WARN(...messages: unknown[]): void {
    this.print(LogLevel.WARN, ...messages)
  }

  ERROR(...messages: unknown[]): void {
    this.print(LogLevel.ERROR, ...messages)
  }

  private print(level: LogLevelType, ...messages: unknown[]): void {
    if (level < this.options.level || !this.options.enable) {
      return
    }

    this.options.formatters.forEach(formatter => (messages = formatter(...messages)))

    const args = [
      pc.cyan(`[${new Date().toLocaleString()}]`),
      this.options.colors[level](`[${this.options.names[level]}]`),
    ]

    if (this.options.title) {
      args.push(pc.yellow(`[${this.options.title}]`))
    }

    console.log(...args, ...messages)
  }
}
