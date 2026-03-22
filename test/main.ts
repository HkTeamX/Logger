import { defaultTransformer, Logger, saveFileTransformer } from '../src/index.js'

const logger = new Logger({
  title: 'Test Logger',
  Transformers: [defaultTransformer, saveFileTransformer({ filename: () => `./logs/${new Date().toISOString().slice(0, 10)}.log` })],
})

logger.DEBUG('This is a debug message', { a: 1, b: 2 })
logger.INFO('This is an info message', [1, 2, 3])
logger.WARN('This is a warning message', new Error('Something went wrong'))
logger.ERROR('This is an error message', { error: 'Error details' })
