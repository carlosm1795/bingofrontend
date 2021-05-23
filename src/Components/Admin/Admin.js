import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import socketIOClient from "socket.io-client";
import "./admin.css";
import axios from "axios";
import ValidateCarton from "./ValidateCarton";
import SearchCartonNumbers from "./SearchCartonNumbers";

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

const Admin = () => {
  const classes = useStyles();
  const [numeros, setNumeros] = useState([]);
  const [winners, setWinners] = useState([]);
  const sendNewNumber = () => {
    axios
      .get(`/sendNewNumber`)
      .then((res) => setNumeros([...numeros, res.data.response]));
  };
  const [value, setValue] = React.useState("");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const socket = socketIOClient("/");

    socket.on("Winners", (data) => {
      setWinners([...winners, data]);
    });
  }, []);
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper>
            Lista de Numeros
            <div className="listaNumeros">{numeros.join()}</div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Card>
              <CardContent>
                <FormControl
                  className={classes.root}
                  type="number"
                  fullWidth={true}
                >
                  <Typography color="textSecondary" gutterBottom>
                    Ultimo Numero
                  </Typography>
                  <Typography color="textSecondary">
                    <h1>{numeros[numeros.length - 1]}</h1>
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={sendNewNumber}
                  >
                    Nuevo Numero
                  </Button>
                </FormControl>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Card>
              <CardContent>
                <FormControl
                  className={classes.root}
                  type="number"
                  fullWidth={true}
                >
                  <Typography color="textSecondary" gutterBottom>
                    Quien dice que gano?
                  </Typography>
                  <div class="listaNumeros">
                    {winners.map((winner) => (
                      <p>{winner}</p>
                    ))}
                  </div>
                  <Button
                    // onClick={() => setWinners([])}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Limpiar Lista
                  </Button>
                </FormControl>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        {/* <Grid item xs={6}>
          <Paper>
            <Card>
              <ValidateCarton />
            </Card>
          </Paper>
        </Grid> */}
        <Grid item xs={6}>
          <Paper>
            <Card>
              <SearchCartonNumbers />
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Card>
              <SearchCartonNumbers />
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
