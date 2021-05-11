import axios from "axios";

const url = "http://localhost:5000";

export const getCarton = () => axios.get(`${url}/bingo`);
export const gane = (usuario) => axios.get(`${url}/winner/${usuario}`);
