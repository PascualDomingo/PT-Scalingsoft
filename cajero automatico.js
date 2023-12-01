console.log(calcularCambio(1835.09));

function calcularCambio(cantidad) {
    //se inicializa un array con el tipo de billetes y monedas
  const moneda = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
  const cambio = {}; //inicializar array de cambio

  //asignar valor 0, para cada tipo de moneda o billete
  moneda.forEach(valor => {
    cambio[valor] = 0;
  });

  // Calcular la cantidad de billete o meneda a cambiar.
  moneda.forEach(valor => {
    while (cantidad >= valor) {
      cambio[valor]++;
      cantidad -= valor;
      cantidad = parseFloat(cantidad).toFixed(2)
    }
  });

  //retornar el cambio de moneda
  return cambio;
}