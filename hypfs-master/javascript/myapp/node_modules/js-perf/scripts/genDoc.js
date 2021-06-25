const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')
const path = require('path')

/* input and output paths */
const inputFile = path.resolve(path.join(__dirname, 'src/index.js'))
const outputDir = __dirname

/* get template data */
const templateData = jsdoc2md.getTemplateDataSync({ files: inputFile })

const output = jsdoc2md.renderSync({
  data: templateData
})

fs.writeFileSync(path.resolve(outputDir, `API.md`), output)
