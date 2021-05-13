import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  TextField,
  Button,
  ButtonGroup,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    marginLeft: 5,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const TypeGames = () => {
  const [typeGames, setTypeGames] = useState([]);
  const [newName, setNewName] = useState("");
  const [formValues, setFormValues] = useState({
    id: "",
    nombre: "",
  });
  const [id, setId] = useState("");
  const resetFormValues = () => {
    setFormValues({
      id: "",
      nombre: "",
    });
  };
  const getTypeGames = () => {
    axios.get(`http://localhost:5000/typeGame/`).then((res) => {
      setTypeGames(res.data.games);
    });
    resetFormValues();
  };

  useEffect(() => {
    getTypeGames();
  }, []);

  const updateField = (event) => {
    setFormValues({ ...formValues, nombre: event.target.value });
  };

  const updateForms = (id, nombre) => {
    setFormValues({ id, nombre });
  };

  const showNotification = (type, message, title) => {
    store.addNotification({
      title: title,
      message: message,
      type: type, // 'default', 'success', 'info', 'warning'
      container: "top-right", // where to position the notifications
      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      dismiss: {
        duration: 3000,
      },
    });
  };

  const updateIntoDb = () => {
    const data = { id: formValues.id, nombre: formValues.nombre };
    var config = {
      method: "patch",
      url: "http://localhost:5000/typeGame/updateGame",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getTypeGames();
        showNotification("success", "Entry Updated", "Entry Updated");
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        showNotification("success", error, "Error");
        console.log(error);
      });
  };

  const deleteEntry = () => {
    const data = { id: formValues.id };
    var config = {
      method: "delete",
      url: "http://localhost:5000/typeGame/deleteGame",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getTypeGames();
        showNotification("success", "Entry Deleted", "Entry Deleted");
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        showNotification("success", error, "Error");
        console.log(error);
      });
  };
  const AddEntry = () => {
    const data = { nombre: formValues.nombre };
    var config = {
      method: "post",
      url: "http://localhost:5000/typeGame/newGame",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getTypeGames();
        showNotification("success", "Entry Created", "Entry Created");
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        showNotification("error", error, "Error");
        console.log(error);
      });
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {typeGames.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.nombre}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        onClick={() => updateForms(row._id, row.nombre)}
                        color="primary"
                        variant="contained"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <FormControl>
              {formValues.id}
              <TextField
                onChange={updateField}
                id="name-input"
                name="name"
                label="Name"
                type="text"
                value={formValues.nombre}
              />
            </FormControl>
            <br></br>
            <br></br>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={updateIntoDb}
              >
                Update
              </Button>
              <Button
                onClick={deleteEntry}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
              <Button onClick={AddEntry} variant="contained" color="green">
                Create
              </Button>
            </ButtonGroup>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TypeGames;
