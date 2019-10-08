const path = require('path')
const cssReg = /\.css$/
const htmlReg = /\.html$/
const linkReg = /<link (?=.*rel="stylesheet")(?=.*type="text\/css")(?=.*href="(.+?\.css)").*?>/g
const headReg = /<\/head>/

exports.postBuild = function postBuild (files, config) {
  return new Promise(function (resolve, reject) {
    try {
      const filtered = files.filter(file => !file.dest.match(cssReg))
      const stylesheets = files.filter(file => file.dest.match(cssReg))

      const next = filtered.map(file => {
        if (file.src.match(htmlReg)) {
          console.log(file.content.toString())
          const links = []
          let markup = file.content.toString().replace(linkReg, function (match, href) {
            links.push(path.resolve(config.buildDir, href.replace(/^\//, '')))

            console.log(match, href)

            return ''
          })

          const styles = links.map(link => {
            const file = stylesheets.find(s => s.dest === link)

            if (file) {
              return file.content.toString()
            }

            return ''
          }).join('')

          markup = markup.replace(headReg, '<style>' + styles + '</style></head>')

          return Object.assign({}, file, {
            content: Buffer.from(markup)
          })
        }

        return file
      })

      resolve(next)
    } catch (e) {
      reject(e)
    }
  })
}