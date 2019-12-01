

export const calculateFuel = mass => Math.floor(mass/3)-2;
export const calculateAdditionalFuel = mass => {
  let total = 0;
  while (mass > 0) {
    const fuel = calculateFuel(mass);
    mass = fuel;
    if (fuel > 0) {
      total = fuel + total;
      mass = fuel;
    }
  }
  return total;
}

export const partOne = (masses) => {
  return masses.reduce((curr, mass) => {
    return curr + calculateFuel(mass);
  }, 0)
}

export const partTwo = (masses) => {
  return masses.reduce((curr, mass) => {
    return curr + calculateAdditionalFuel(mass);
  }, 0)
}