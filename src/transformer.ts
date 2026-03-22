import type { Transformer } from './types.js'
import fs from 'node:fs'
import path from 'node:path'
import util from 'node:util'

/**
 * 判断一个值是否为对象
 */
export function isObject(value: unknown, allowArray = false): value is object {
  return value !== null && typeof value === 'object' && (!Array.isArray(value) || allowArray)
}

/**
 * 默认格式化器
 */
export const defaultTransformer: Transformer = (_context, ...args) => {
  return args.map((arg) => {
    if (typeof arg === 'string') {
      try {
        arg = JSON.parse(arg)
      }
      catch {}
    }

    if (isObject(arg, true)) {
      return util.inspect(arg, { depth: null, colors: true, compact: false })
    }

    return String(arg)
  })
}

export interface SaveFileTransformerOptions {
  filename: string | (() => string)
}

// eslint-disable-next-line no-control-regex
export const stripAnsiRegex = /\u001B\[[0-9;]*m/g
let writeQueue = Promise.resolve()

export function saveFileTransformer(options: SaveFileTransformerOptions = { filename: 'log.txt' }): Transformer {
  return ({ logger, level }, ...args) => {
    // 2. 将写入操作排入队列
    writeQueue = writeQueue
      .then(async () => {
        const messages = [
          `[${new Date().toLocaleString()}]`,
          `[${logger.options.names[level]}]`,
        ]

        if (logger.options.title) {
          messages.push(`[${logger.options.title}]`)
        }

        const content = args.map(arg => String(arg).replace(stripAnsiRegex, ''))

        messages.push(...content)

        const filename = typeof options.filename === 'function' ? options.filename() : options.filename
        const dirname = path.dirname(filename)

        // 确保目录存在
        await fs.promises.mkdir(dirname, { recursive: true })
        // 执行写入
        await fs.promises.appendFile(filename, `${messages.join(' ')}\n`)
      })
      .catch(
        // 防止某次写入失败导致整个队列断裂
      )

    return args as string[]
  }
}
