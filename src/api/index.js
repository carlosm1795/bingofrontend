import axios from "axios";

const mainUrl = "http://localhost:5000";
//const mainUrl = "https://bingobacked.herokuapp.com";

export const getCarton = (jugador) =>
  axios({
    method: "post",
    url: `${mainUrl}/carton/getCarton`,
    headers: {
      "Content-Type": "application/json",
    },
    data: jugador,
  });
export const gane = (usuario) => axios.get(`${mainUrl}/winner/${usuario}`);

//Validations Calls
export const getTypeGamesCall = () => axios.get(`${mainUrl}/typeGame`);
export const validateCartonCall = (data) =>
  axios({
    method: "post",
    url: `${mainUrl}/carton/validateCarton`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
