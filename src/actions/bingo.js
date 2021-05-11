import * as api from "../api";

export const getCarton = () => async (dispatch) => {
  try {
    const { data } = await api.getCarton();
    dispatch({ type: "getCarton", payload: data });
  } catch (error) {
    console.log(error);
  }
};
