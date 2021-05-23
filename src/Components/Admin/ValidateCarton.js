import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  Container,
  FormControl,
  Button,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { showNotification } from "../../utils/Notification";

import { makeStyles } from "@material-ui/core/styles";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import * as api from "../../api/index.js";

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

const ValidateCarton = () => {
  const classes = useStyles();
  const [resultValidation, setResultValidation] = useState(null);
  const [typeGames, setTypeGames] = useState([]);
  const [validation, setValidation] = useState({
    jugador: "",
    typoDeJuego: "",
  });
  const modifyTypoDeJuego = (e) => {
    setValidation({ ...validation, [e.target.name]: e.target.value });
  };
  const getTypeGames = async () => {
    const dataCall = await api.getTypeGamesCall();
    setTypeGames(dataCall.data.games);
  };

  const validate = async () => {
    setResultValidation("Loading");
    const data = {
      jugador: 1020,
      typoDeJuego: "Cuatro Esquinas",
    };
    const resultValidationCall = await api.validateCartonCall(validation);
    setResultValidation(resultValidationCall.data.resultado);
    if (resultValidationCall.data.resultado === "true") {
      showNotification(
        "success",
        `Usuario gano con ${validation.typoDeJuego}`,
        "Entry Updated"
      );
    } else {
      showNotification(
        "warning",
        resultValidationCall.data.resultado,
        "Los sentimos pero..."
      );
    }
    // var config = {
    //   method: "post",
    //   url: "http://localhost:5000/carton/validateCarton",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: validation,
    // };

    // axios(config)
    //   .then(function (response) {
    //     setResultValidation(response.data.resultado);
    //     if (response.data.resultado === true) {
    //       showNotification("success", "Usuario gano", "Entry Updated");
    //     } else {
    //       showNotification(
    //         "warning",
    //         response.data.resultado,
    //         "Los sentimos pero..."
    //       );
    //     }
    //     console.log(response.data.resultado);
    //   })
    //   .catch(function (error) {
    //     showNotification("warning", "El Usuario no ha ganado", "Error");
    //     console.log(error);
    //   });
  };

  useEffect(() => {
    getTypeGames();
  }, []);
  return (
    <Container>
      <FormControl className={classes.root} type="number" fullWidth={true}>
        <TextField
          id="standard-basic"
          name="jugador"
          value={validation.jugador}
          onChange={modifyTypoDeJuego}
          label="Numero de Jugador"
        />
        <Select
          name="typoDeJuego"
          value={validation.typoDeJuego}
          onChange={modifyTypoDeJuego}
          label="Typo de Juego"
        >
          {typeGames.map((game) => (
            <MenuItem value={game.nombre} id={game._id}>
              {game.nombre}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={validate}>
          {" "}
          Validar
        </Button>

        <Typography>
          Resultado:
          {resultValidation ? (
            <p
              className={
                resultValidation === "true" ? classes.sucess : classes.fail
              }
            >
              {resultValidation.toString()}
            </p>
          ) : null}
        </Typography>
      </FormControl>
    </Container>
  );
};

export default ValidateCarton;
