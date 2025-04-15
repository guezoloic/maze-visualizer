


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**  Generate an even number 
 *   range exclusive
*/
/*function randEven(range) {
        
  let number = Math.floor( Math.random() * range / 2 ) * 2;
  return number;
}*/

/**  Generate an even number 
 *   a inclusive, b exclusive
*/
function randEven(a, b) {
  let lower = Math.floor(a/2+(a%2))
  let upper = Math.floor(b/2+(b%2))
  let number = Math.floor( Math.random() * (upper - lower)) + lower;
  return number*2
}

function randOdd(a, b) {
  let lower = Math.floor(a/2)
  let upper = Math.floor(b/2)
  let number = Math.floor( Math.random() * (upper - lower)) + lower;
  return number*2+1
}