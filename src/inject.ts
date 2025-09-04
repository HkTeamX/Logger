import { Logger } from './logger.js'
import { LoggerOptions } from './types.js'

export class InjectLogger {
  logger: Logger

  constructor(options?: LoggerOptions) {
    this.logger = new Logger({
      title: this.constructor.name,
      ...options,
    })
  }
}
