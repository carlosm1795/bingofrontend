import axios from "axios";

const url = "http://localhost:5000";
const mainUrl = "https://bingobacked.herokuapp.com";

export const getCarton = () => axios.get(`${mainUrl}/bingo`);
export const gane = (usuario) => axios.get(`${url}/winner/${usuario}`);
