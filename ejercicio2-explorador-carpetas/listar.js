const fs = require('node:fs')
const pc = require('picocolors')
const folder = process.argv[2] || '.'
let totalsize = 0
let totalArchivos = 0
let totalDirectorios = 0

fs.promises.readdir(folder, {withFileTypes: true})
.then(files => {
    files.forEach(file => {
        if (file.isDirectory()) {
            console.log(pc.blue(file.name+"/"))
            totalDirectorios++
        }
        if (file.name.startsWith(".") && file.isFile()) {
            console.log(pc.gray(file.name))
            totalsize += fs.statSync(folder + '/' + file.name).size
            totalArchivos++
        }
        else if (file.isFile()) {
            console.log(pc.green(file.name))
            totalsize += fs.statSync(folder + '/' + file.name).size
            totalArchivos++
        }
    })
    console.log(totalDirectorios + " carpetas, " + totalArchivos + " archivos, " + totalsize + " bytes en total")
})
.catch(err => {
    if (err) {
        console.error(pc.bgRed('Error al leer el directorio: ' + folder))
        process.exit(1)
    }
})
