import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: "#00A2ED",
    },

    header: {
      textAlign: "center",
      background: "#00A2ED",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(10),
    },
  })
);

const Login = () => {
  const classes = useStyles();
  const [login, setLogin] = useState({
    username: null,
    codigo: null,
  });
  const handleInputChanges = (e) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
    console.log(login);
  };
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login App" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="username"
              name="username"
              type="email"
              label="Usuario"
              placeholder="Usuario"
              margin="normal"
              onChange={handleInputChanges}
            />
            <TextField
              fullWidth
              id="codigo"
              name="codigo"
              type="text"
              label="Codigo"
              placeholder="Codigo"
              margin="normal"
              onChange={handleInputChanges}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="large" className={classes.loginBtn}>
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Login;
