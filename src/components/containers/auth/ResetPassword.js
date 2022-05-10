import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "util/CircularProgress";
import logo from "assets/images/homepage/logopngs.png";
import { useDispatch, useSelector } from "react-redux";
import { reset_password } from "store/actions/Auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://deghauzimicrolending.com/">
        De-Ghauzi Microlending
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const ResetPassword = () => {
  const dispatch = useDispatch();
  const sent = useSelector(state => state.authReducer.emailSent);
  const [formData, setFormData] = useState({
    email: ""
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(reset_password({ ...formData }));
  };

  if (sent) {
    setTimeout(() => {
      window.location.href = "/";
    }, 4000);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="de-ghauzi" title="de-ghauzi" />
        <Typography component="h6" variant="body">
          Enter your email address below and we'll send you a link to reset your password.
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={FormData.email}
            onChange={handleChange}
          />

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={6} mb={6}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ResetPassword;
