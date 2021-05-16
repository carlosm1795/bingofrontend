import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Container,
} from "@material-ui/core";
import axios from "axios";
import { AppBar } from "@material-ui/core";
import socketIOClient from "socket.io-client";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import * as api from "../../api";
import { Alert, AlertTitle } from "@material-ui/lab";

const Carton = () => {
  //const carton = useSelector((state) => state.bingo);
  const classes = useStyles();
  const [carton, setCarton] = useState({ B: [] });
  const [response, setReponse] = useState("");
  const [hideAlert, sethideAlert] = useState(true);
  const [colors, setColors] = useState({
    B0: "default",
    B1: "default",
    B2: "default",
    B3: "default",
    B4: "default",
    I0: "default",
    I1: "default",
    I2: "default",
    I3: "default",
    I4: "default",
    N0: "default",
    N1: "default",
    N2: "default",
    N3: "default",
    N4: "default",
    G0: "default",
    G1: "default",
    G2: "default",
    G3: "default",
    G4: "default",
    O0: "default",
    O1: "default",
    O2: "default",
    O3: "default",
    O4: "default",
  });
  const resetCarton = () => {
    setColors({
      B0: "default",
      B1: "default",
      B2: "default",
      B3: "default",
      B4: "default",
      I0: "default",
      I1: "default",
      I2: "default",
      I3: "default",
      I4: "default",
      N0: "default",
      N1: "default",
      N2: "default",
      N3: "default",
      N4: "default",
      G0: "default",
      G1: "default",
      G2: "default",
      G3: "default",
      G4: "default",
      O0: "default",
      O1: "default",
      O2: "default",
      O3: "default",
      O4: "default",
    });
  };
  const setGane = () => {
    api.gane("carlos");
  };
  const changeColor = (value) => {
    let newColor = "";
    if (colors[value] === "default") {
      newColor = "primary";
    } else {
      newColor = "default";
    }
    setColors({
      ...colors,
      [value]: newColor,
    });
  };

  useEffect(() => {
    const socket = socketIOClient("/");
    socket.on("FromAPI", (data) => {
      setReponse(data);
    });
  }, []);

  useEffect(() => {
    axios.get("bingo/").then((response) => setCarton(response.data));
  }, []);

  return (
    <div>
      <Container>
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h5" align="center">
            {response ? <h4>Número: {response}</h4> : null}
          </Typography>
        </AppBar>
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h4" align="center">
            <Button variant="contained" color="primary" onClick={resetCarton}>
              Limpiar Cartón
            </Button>
            <Button onClick={setGane} variant="contained" color="primary">
              Gané
            </Button>
          </Typography>
        </AppBar>
      </Container>
      <TableContainer component={Paper} className={classes.carton}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.row1} align="center">
                B
              </TableCell>
              <TableCell className={classes.row2} align="center">
                I
              </TableCell>
              <TableCell className={classes.row1} align="center">
                N
              </TableCell>
              <TableCell className={classes.row2} align="center">
                G
              </TableCell>
              <TableCell className={classes.row1} align="center">
                O
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carton.B.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => changeColor(`B${index}`)}
                    color={colors[`B${index}`]}
                  >
                    {row}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => changeColor(`I${index}`)}
                    color={colors[`I${index}`]}
                  >
                    {carton.I[index]}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => changeColor(`N${index}`)}
                    color={colors[`N${index}`]}
                  >
                    {carton.N[index]}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => changeColor(`G${index}`)}
                    color={colors[`G${index}`]}
                  >
                    {carton.G[index]}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => changeColor(`O${index}`)}
                    color={colors[`O${index}`]}
                  >
                    {carton.O[index]}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Carton;
