const buildLayers = (input, width, height) => {
  const pixels = input.split('').map(Number);
  const layers = [];
  while(pixels.length) {
    const removed = pixels.splice(0, width*height);
    layers.push(removed);
  }
  return layers;
}

export const partOne = (input, width, height) => {
  const layers = buildLayers(input, width, height);
  let minZeros = Infinity;
  let answer = null;

  layers.forEach((layer) => {
    const stats = layer.reduce((prev, x) => {
      prev[x] = prev[x] ? prev[x] + 1 : 1;
      return prev;
    }, {});
    if (stats[0] < minZeros) {
      minZeros = stats[0];
      answer = stats[1] * stats[2]
    }
  })
  return answer;
}

export const partTwo = (input, width, height) => {
  const layers = buildLayers(input, width, height);
  const img = [];
  for (let i = 0; i < layers[0].length; i++) {
    let l = 0;
    while(true) {
      if (layers[l][i] !== 2) {
        img.push(layers[l][i] === 0 ? " " : "X");
        break;
      }
      l++;
    }
  }

  const rendered = [];
  while(img.length) {
    const removed = img.splice(0, width);
    rendered.push(removed);
  }
 return rendered.map(x => x.join('')).join(`\n`);
}