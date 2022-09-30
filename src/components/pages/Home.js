import { Typography, Box, makeStyles, Grid, Button } from "@material-ui/core";
import { deepPurple, green, orange } from "@material-ui/core/colors";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "White",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "White",
  },
  stuListColor: {
    backgroundColor: orange[400],
    color: "White",
  },

  tableHeadCell: {
    color: "White",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default function Home() {
  const classes = useStyles();
  const [student, setStudent] = useState({
    stuname: "",
    email: "",
    phone: "",
    address: "",
  });

  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const onTextFieldChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/faimely`, student);
      setStatus(true);
      navigate("/");
    } catch (error) {
      console.log("Something is wrong");
    }
  };

  if (status === true) {
    return <Home />;
  }

  return (
    <div>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">SAKHIYA FAMILY</Typography>
      </Box>
      <Box textAlign="left" p={2} mb={2}>
        <Link to="/">
          <Button variant="contained" color="primary">
            Go To List
          </Button>
        </Link>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={11} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">ADD MEMBER</Typography>
          </Box>

          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="phone"
                  name="phone"
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone No Address"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="address"
                  name="address"
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
            </Grid>

            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onFormSubmit(e)}
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
