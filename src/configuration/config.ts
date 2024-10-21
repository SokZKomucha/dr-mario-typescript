export const refreshRate = 144;
export const virusCount = 8;


// Metoda kalkukacji częstotliwości odświeżania:
// requestAnimationFrame(t1 => {
//   requestAnimationFrame(t2 => {
//     console.log(1000 / (t2 - t1))
//   })
// })