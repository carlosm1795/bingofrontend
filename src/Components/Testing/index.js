console.log("hola");

const carton = {
  B: [11, 10, 2, 5, 6],
  I: [29, 25, 16, 22, 26],
  N: [35, 41, 34, 39, 40],
  G: [58, 52, 51, 53, 47],
  O: [62, 67, 69, 70, 64],
};

const numerosMostrados = [11, 25, 34, 53, 64, 62, 52, 22, 6];

const validateCuatroEsquinas = (carton, numerosMostrados) => {
  let success = false;
  let countMatch = 0;
  let numberToAnalyze = [carton.B[0], carton.B[4], carton.O[0], carton.O[4]];
  for (let number of numerosMostrados) {
    if (numberToAnalyze.includes(number)) {
      countMatch = countMatch + 1;
    }
    console.log(countMatch);
    if (countMatch >= 4) {
      success = true;
      break;
    }
  }
  return success;
};

const validateUnaLinea = (carton, numerosMostrados) => {
  let checker = (arr, target) => target.every((v) => arr.includes(v));
  let win = false;
  win = checker(numerosMostrados, carton);
  return win;
};

const validateCartonLleno = (carton, numerosMostrados) => {
  let keys = Object.keys(carton);
  let win = false;
  let countSuccess = 0;
  let lineaEvaluada = [];
  let validations = { B: false, I: false, N: false, G: false, O: false };
  for (let key of keys) {
    lineaEvaluada = carton[key];
    win = validateUnaLinea(carton[key], numerosMostrados);
    validations[key] = win;
  }
  for (let key of keys) {
    if (validations[key] === true) {
      countSuccess = countSuccess + 1;
    }
  }
  validations["finalCount"] = countSuccess;
  return validations;
};
const getLineasVerticales = (carton) => {
  let keys = Object.keys(carton);
  let line = [];
  let win = false;
  let lineaEvaluada = [];
  for (const [index, value] of carton["B"].entries()) {
    for (let key of keys) {
      line = [...line, carton[key][index]];
    }
    lineaEvaluada = line;
    win = validateUnaLinea(line, numerosMostrados);
    if (win) {
      break;
    }
    line = [];
  }
  return { ganador: win, lineaEvaluada: lineaEvaluada, formato: "Vertical" };
};
const getLinesHorizontales = (carton) => {
  let keys = Object.keys(carton);
  let win = false;
  let lineaEvaluada = [];
  for (let key of keys) {
    lineaEvaluada = carton[key];
    win = validateUnaLinea(carton[key], numerosMostrados);
    if (win) {
      break;
    }
  }
  return { ganador: win, lineaEvaluada: lineaEvaluada, formato: "Horizontal" };
};

const validateL = (carton, numerosMostrados) => {
  let lupRight = [
    ...carton["B"],
    carton["I"][0],
    carton["N"][0],
    carton["G"][0],
    carton["O"][0],
  ];
  let ldownRight = [
    ...carton["O"],
    carton["I"][0],
    carton["N"][0],
    carton["G"][0],
    carton["B"][0],
  ];
  let lupLeft = [
    ...carton["B"],
    carton["I"][4],
    carton["N"][4],
    carton["G"][4],
    carton["O"][4],
  ];

  let ldownLeft = [
    ...carton["O"],
    carton["I"][4],
    carton["N"][4],
    carton["G"][4],
    carton["B"][4],
  ];

  let results = {
    lupRight: validateUnaLinea(lupRight, numerosMostrados),
    ldownRight: validateUnaLinea(ldownRight, numerosMostrados),
    lupLeft: validateUnaLinea(lupLeft, numerosMostrados),
    ldownLeft: validateUnaLinea(ldownLeft, numerosMostrados),
  };
  return results;
};

const validateDiagonals = (carton, numerosMostrados) => {
  let diagonalUpDown = [
    carton["B"][0],
    carton["I"][1],
    carton["N"][2],
    carton["G"][3],
    carton["O"][4],
  ];
  let diagonalDownUp = [
    carton["B"][4],
    carton["I"][3],
    carton["N"][2],
    carton["G"][1],
    carton["O"][0],
  ];
  let validation = {
    diagonalUpDown: validateUnaLinea(diagonalUpDown, numerosMostrados),
    diagonalDownUp: validateUnaLinea(diagonalDownUp, numerosMostrados),
  };
  return validation;
};
//console.log(validateCuatroEsquinas(carton, numerosMostrados));
//console.log(getLineasVerticales(carton));
//console.log(getLinesHorizontales(carton));
//console.log(validateCartonLleno(carton, numerosMostrados));
//console.log(validateL(carton, numerosMostrados));
console.log(validateDiagonals(carton, numerosMostrados));
