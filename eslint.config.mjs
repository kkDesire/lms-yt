import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  typescript: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
})
