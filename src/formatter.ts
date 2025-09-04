import util from 'node:util'
import type { Formatter } from './types.js'

/**
 * 判断一个值是否为对象
 * @param value
 * @returns
 */
export function is_object(value: unknown, allow_array = false): value is object {
  return value !== null && typeof value === 'object' && (!Array.isArray(value) || allow_array)
}

/**
 * 默认格式化器
 */
export const defaultFormatter: Formatter = (...args) => {
  return args.map((arg) => {
    if (is_object(arg, true)) arg = util.inspect(arg, { depth: null, colors: true, compact: false })
    try {
      return typeof arg === 'string' ? JSON.parse(arg) : arg
    } catch {
      return arg
    }
  })
}
