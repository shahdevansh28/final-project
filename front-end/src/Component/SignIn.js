import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [details, setDetails] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  //const [cookie, setCookie] = useCookies(['user']);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("https://localhost:44397/api/Auth/Login", {
        username: details.username,
        password: details.password,
      });
      Cookies.set("token", res.data.token);
      Cookies.set("userId", res.data.user.id);

      const decoded = jwtDecode(res.data.token);

      if (
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] == "User"
      ) {
        navigate("/");
      } else if (
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] == "Admin"
      ) {
        navigate("/admin");
      }
    } catch (err) {
      if (err.response.status === 401)
        console.log("Unautherized-" + err.response.status);
    }
  };

  let name, value;
  const onChangeInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="username"
              autoComplete="username"
              value={details.username}
              onChange={onChangeInput}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={details.password}
              onChange={onChangeInput}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
