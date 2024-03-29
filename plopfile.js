const numberMap = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eightteen",
  19: "nineteen",
  20: "twenty",
  21: "twentyone",
  22: "twentytwo",
  23: "twentythree",
  24: "twentyfour",
  25: "twentyfive",
};

/**
 *
 * @param {import('plop').NodePlopAPI} plop
 */
module.exports = (plop) => {
  plop.setHelper("pad", function (text) {
    return text.toString().padStart(2, "0");
  });

  plop.setHelper("inWords", (txt) => numberMap[parseInt(txt)] || txt);

  plop.setGenerator("day", {
    description: "Create a new day",
    prompts: [
      {
        type: "input",
        name: "year",
        message: "What year?",
        default: new Date().getFullYear(),
      },
      {
        type: "input",
        name: "date",
        message: "What date?",
        default: new Date().getDate(),
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "src/{{year}}/{{pad date}}/",
        base: "templates/day/",
        templateFiles: "templates/day/**/*",
      },
    ],
  });
};
