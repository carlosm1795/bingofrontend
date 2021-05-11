export default (carton = [{ B: [] }], action) => {
  switch (action.type) {
    case "getCarton":
      let data = action.payload;
      return [action.payload];
    default:
      return carton;
  }
};
