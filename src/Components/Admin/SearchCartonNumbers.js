import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Container, Button, TextField } from "@material-ui/core";
import * as api from "../../api/index.js";
import { showNotification } from "../../utils/Notification";
import { store } from "react-notifications-component";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  sucess: {
    color: "green",
  },
  fail: {
    color: "red",
  },
}));

const SearchCartonNumbers = () => {
  const [cartonNumber, setCartonNumber] = useState(null);
  const [carton, setCarton] = useState({ rowB: [] });
  const [userFound, setUserFound] = useState(true);
  const classes = useStyles();
  const ConsultCarton = async () => {
    let jugador = {
      jugador: cartonNumber,
    };
    const response = await api.getCarton(jugador);
    let information = response.data.result;
    if (information != null) {
      setUserFound(true);
      delete information["createdAt"];
      delete information["jugador"];
      delete information["__v"];
      delete information["_id"];
      console.log(information);
      setCarton(information);
      showNotification("success", "User Found", "User Found");
    } else {
      setUserFound(false);
      setCarton({ rowB: [] });
      showNotification("warning", "User not Found", "Sorry but...");
    }
  };
  return (
    <Container>
      <FormControl className={classes.root} type="number" fullWidth={true}>
        <TextField
          id="standard-basic"
          name="jugador"
          value={cartonNumber}
          onChange={(e) => setCartonNumber(e.target.value)}
          label="Numero de Jugador"
        />
        <Button variant="contained" color="primary" onClick={ConsultCarton}>
          Consultar Carton
        </Button>
        {carton.rowB.map((row, index) => (
          <p key={`Row-${index}`}>
            {row}-{carton.rowI[index]}-{carton.rowN[index]}-{carton.rowG[index]}
            -{carton.rowO[index]}-
          </p>
        ))}
        {!userFound ? <p className={classes.fail}>User not Found</p> : null}
      </FormControl>
    </Container>
  );
};

export default SearchCartonNumbers;
