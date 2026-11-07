const os = require('node:os')
const fs = require('node:fs')
const pc = require('picocolors');

const memoriaTotal = os.totalmem() / 1024 / 1024;
const memoriaLibre = os.freemem() / 1024 / 1024;
const memoriaUsado = (1 - (memoriaLibre) / (memoriaTotal))*100

const uptimeSegundos = os.uptime()

const horas = Math.floor(uptimeSegundos / 3600);
const minutos = Math.floor((uptimeSegundos % 3600) / 60)

const uptimeFormateado = `${horas}h ${minutos}m`

let contenidoArchivo = '';

contenidoArchivo += '\n----------------------------------------------------------------------\n';
contenidoArchivo += '\tInformación del sistema operativo:\n';
contenidoArchivo += '----------------------------------------------------------------------\n';

contenidoArchivo += `\tNombre del equipo: ${os.hostname()}\n`;
contenidoArchivo += `\tNombre del sistema operativo: ${os.platform()}\n`;
contenidoArchivo += `\tVersión del sistema operativo: ${os.release()}\n`;
contenidoArchivo += `\tArquitectura: ${os.arch()}\n`;
contenidoArchivo += `\tUsuario actual: ${os.userInfo().username}\n`;
contenidoArchivo += `\tModelo Procesador: ${os.cpus()[0].model}\n`;
contenidoArchivo += `\tNúmero de Procesadores: ${os.cpus().length}\n`;
contenidoArchivo += `\tMemoria total: ${memoriaTotal.toFixed(2)} MB\n`;
contenidoArchivo += `\tMemoria libre: ${memoriaLibre.toFixed(2)} MB\n`;

if (memoriaUsado > 85) {
    contenidoArchivo += `\tPorcentaje Memoria usado: ${memoriaUsado.toFixed(2)}%\n`;
} else if (memoriaUsado >= 60) {
    contenidoArchivo += `\tPorcentaje Memoria usado: ${memoriaUsado.toFixed(2)}%\n`;
} else {
    contenidoArchivo += `\tPorcentaje Memoria usado: ${memoriaUsado.toFixed(2)}%\n`;
}

contenidoArchivo += `\tTiempo activo: ${uptimeFormateado}\n`;
contenidoArchivo += '----------------------------------------------------------------------\n';

const ahora = new Date();
const año = ahora.getFullYear();
const mes = String(ahora.getMonth() + 1).padStart(2, '0');
const dia = String(ahora.getDate()).padStart(2, '0');
const hora = String(ahora.getHours()).padStart(2, '0');
const minuto = String(ahora.getMinutes()).padStart(2, '0');
const segundo = String(ahora.getSeconds()).padStart(2, '0');

const fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
const lineaHistorial = `${fechaFormateada} | RAM usada: ${memoriaUsado.toFixed(0)}%\n`;

try {
    fs.writeFileSync('informe.txt', contenidoArchivo, 'utf8');
    console.log(pc.green('✔ Informe detallado guardado en informe.txt'));

    fs.appendFileSync('historial.log', lineaHistorial, 'utf8');
    console.log(pc.green('✔ Registro añadido a historial.log'));
} catch (error) {
    console.error(pc.red('Error al interactuar con los archivos:'), error);
}

console.log('\n----------------------------------------------------------------------')
console.log(pc.bold(pc.cyan('\tInformación del sistema operativo:')))
console.log('----------------------------------------------------------------------')

console.log(pc.dim('\tNombre del equipo:'), pc.white(os.hostname()))
console.log(pc.dim('\tNombre del sistema operativo:'), pc.white(os.platform()))
console.log(pc.dim('\tVersión del sistema operativo:'), pc.white(os.release()))
console.log(pc.dim('\tArquitectura:'), pc.white(os.arch()))
console.log(pc.dim('\tUsuario actual:'), pc.white(os.userInfo().username))
console.log(pc.dim('\tModelo Procesador:'), pc.white(os.cpus()[0].model))
console.log(pc.dim('\tNúmero de Procesadores:'), pc.white(os.cpus().length))
console.log(pc.dim('\tMemoria total:'), pc.white(memoriaTotal.toFixed(2) + " MB"))
console.log(pc.dim('\tMemoria libre:'), pc.white(memoriaLibre.toFixed(2) + " MB"))
if (memoriaUsado > 85) {
    console.log(pc.dim('\tPorcentaje Memoria usado:'), pc.red(memoriaUsado.toFixed(2)+"%"))
} else if (memoriaUsado >= 60) {
    console.log(pc.dim('\tPorcentaje Memoria usado:'), pc.yellow(memoriaUsado.toFixed(2)+"%"))
} else {
    console.log(pc.dim('\tPorcentaje Memoria usado:'), pc.green(memoriaUsado.toFixed(2)+"%"))
}
console.log(pc.dim('\tTiempo activo:'), pc.white(uptimeFormateado))
console.log('----------------------------------------------------------------------\n')