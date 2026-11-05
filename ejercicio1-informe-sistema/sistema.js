const os = require('node:os');
const pc = require('picocolors');

const memoriaTotal = os.totalmem() / 1024 / 1024;
const memoriaLibre = os.freemem() / 1024 / 1024;
const memoriaUsado = (1 - (memoriaLibre) / (memoriaTotal))*100;

const uptimeSegundos = os.uptime();

const horas = Math.floor(uptimeSegundos / 3600);
const minutos = Math.floor((uptimeSegundos % 3600) / 60);

const uptimeFormateado = `${horas}h ${minutos}m`;

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