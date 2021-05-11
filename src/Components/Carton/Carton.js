import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { AppBar } from "@material-ui/core";
import socketIOClient from "socket.io-client";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import * as api from "../../api";
import { Alert, AlertTitle } from "@material-ui/lab";

const Carton = () => {
  const reduxCarton = useSelector((state) => state.bingo);
  const classes = useStyles();
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
      B0: "",
      B1: "",
      B2: "",
      B3: "",
      B4: "",
      I0: "",
      I1: "",
      I2: "",
      I3: "",
      I4: "",
      N0: "",
      N1: "",
      N2: "",
      N3: "",
      N4: "",
      G0: "",
      G1: "",
      G2: "",
      G3: "",
      G4: "",
      O0: "",
      O1: "",
      O2: "",
      O3: "",
      O4: "",
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

  return (
    <div>
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
            {reduxCarton[0].B.map(function (row, index) {
              return (
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
                      {reduxCarton[0].I[index]}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => changeColor(`N${index}`)}
                      color={colors[`N${index}`]}
                    >
                      {reduxCarton[0].N[index]}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => changeColor(`G${index}`)}
                      color={colors[`G${index}`]}
                    >
                      {reduxCarton[0].G[index]}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => changeColor(`O${index}`)}
                      color={colors[`O${index}`]}
                    >
                      {reduxCarton[0].O[index]}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Carton;
