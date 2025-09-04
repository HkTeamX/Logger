import pc from 'picocolors'
import { defaultFormatter } from './formatter.js'
import { LogLevel, type Formatter, type LogColors, type LoggerOptions } from './types.js'

export class Logger {
  private level: LogLevel
  private formatters: Formatter[]
  private names = {
    [LogLevel.DEBUG]: 'DEBUG',
    [LogLevel.INFO]: 'INFO',
    [LogLevel.WARN]: 'WARN',
    [LogLevel.ERROR]: 'ERROR',
  }
  private colors: LogColors = {
    [LogLevel.DEBUG]: pc.magenta,
    [LogLevel.INFO]: pc.blue,
    [LogLevel.WARN]: pc.yellow,
    [LogLevel.ERROR]: pc.red,
  }
  private title: string

  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? LogLevel.INFO
    this.formatters = options.formatters ?? [defaultFormatter]
    this.colors = options.colors ?? this.colors
    this.title = options.title ?? ''
  }

  DEBUG(...messages: unknown[]) {
    this.print(LogLevel.DEBUG, ...messages)
  }

  INFO(...messages: unknown[]) {
    this.print(LogLevel.INFO, ...messages)
  }

  WARN(...messages: unknown[]) {
    this.print(LogLevel.WARN, ...messages)
  }

  ERROR(...messages: unknown[]) {
    this.print(LogLevel.ERROR, ...messages)
  }

  private getDateString() {
    return new Date().toLocaleString()
  }

  private print(level: LogLevel, ...messages: unknown[]) {
    if (level < this.level) return

    this.formatters.forEach((formatter) => (messages = formatter(...messages)))

    const args = [
      pc.cyan(`[${this.getDateString()}]`),
      this.colors[level](`[${this.names[level]}]`),
    ]

    if (this.title) args.push(pc.yellow(`[${this.title}]`))

    console.log(...args, ...messages)
  }

  setLevel(level: LogLevel) {
    this.level = level
  }

  getLevel() {
    return this.level
  }

  pushFormatter(formatter: Formatter) {
    this.formatters.push(formatter)
  }

  unshiftFormatter(formatter: Formatter) {
    this.formatters.unshift(formatter)
  }

  removeFormatter(formatter: Formatter) {
    this.formatters = this.formatters.filter((f) => f !== formatter)
  }

  getFormatters() {
    return this.formatters
  }

  setColors(colors: LogColors) {
    this.colors = colors
  }

  getColors() {
    return this.colors
  }

  setTitle(title: string) {
    this.title = title
  }

  getTitle() {
    return this.title
  }
}
