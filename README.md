# @huan_kong/logger

一个轻量级的 TypeScript 日志库，支持多级别日志、自定义格式化器和彩色输出。

## 特性

- 🎨 **彩色输出** - 基于 picocolors，支持不同日志级别的颜色区分
- 📊 **多级别日志** - 支持 DEBUG、INFO、WARN、ERROR 四个级别
- 🔧 **自定义格式化器** - 可扩展的消息格式化系统
- ⚡ **TypeScript 支持** - 完整的类型定义
- 🎯 **轻量级** - 几乎零依赖（只有picocolors）

## 安装

```bash
npm install @huan_kong/logger
# 或
pnpm add @huan_kong/logger
# 或
yarn add @huan_kong/logger
```

## 快速开始

```typescript
import { Logger, LogLevel } from '@huan_kong/logger'

// 创建 logger 实例
const logger = new Logger()

// 基本使用
logger.INFO('这是一条信息日志')
logger.WARN('这是一条警告日志')
logger.ERROR('这是一条错误日志')
logger.DEBUG('这是一条调试日志') // 默认级别下不会显示

// 设置日志级别
logger.setLevel(LogLevel.DEBUG)
logger.DEBUG('现在可以看到调试日志了')

// 支持多个参数
logger.INFO('用户登录', { userId: 123, ip: '192.168.1.1' })
```

## 配置选项

```typescript
import { Logger, LogLevel, defaultFormatter } from '@huan_kong/logger'

const logger = new Logger({
  level: LogLevel.DEBUG, // 设置日志级别
  formatters: [defaultFormatter], // 自定义格式化器
})
```

## 自定义格式化器

```typescript
import type { Formatter } from '@huan_kong/logger'

// 创建自定义格式化器
const customFormatter: Formatter = (...args) => {
  return args.map((arg) => {
    if (typeof arg === 'string') {
      return arg.toUpperCase()
    }
    return arg
  })
}

// 添加格式化器
logger.pushFormatter(customFormatter)
```

## API 文档

### Logger 类

#### 构造函数

- `new Logger(options?: LoggerOptions)`

#### 日志方法

- `DEBUG(...messages: unknown[])` - 输出调试日志
- `INFO(...messages: unknown[])` - 输出信息日志
- `WARN(...messages: unknown[])` - 输出警告日志
- `ERROR(...messages: unknown[])` - 输出错误日志

#### 配置方法

- `setLevel(level: LogLevel)` - 设置日志级别
- `getLevel()` - 获取当前日志级别
- `pushFormatter(formatter: Formatter)` - 添加格式化器到末尾
- `unshiftFormatter(formatter: Formatter)` - 添加格式化器到开头
- `removeFormatter(formatter: Formatter)` - 移除指定格式化器
- `getFormatters()` - 获取所有格式化器
- `setColors(colors: LogColors)` - 设置颜色主题
- `getColors()` - 获取当前颜色配置

### 日志级别

```typescript
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 代码检查
pnpm lint

# 格式化代码
pnpm format
```

## 许可证

MIT © [huankong233](https://github.com/huankong233)
