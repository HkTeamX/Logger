import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
    ],
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
)
