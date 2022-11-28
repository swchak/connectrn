import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  DialogContentText,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
  Box,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import NurseSelectDropDown from "./NurseSelectDropDown";
import ShiftSelectDropDown from "./ShiftSelectDropDown";
import ShiftsListControl from "./ShiftsListControl";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default class ShiftsListingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      shiftSelected: "",
      nurseSelected: "",
    };
  }

  nurseSelectedHandler = (selectedValue) => {
    this.setState({
      nurseSelected: selectedValue,
    });
  };

  shiftSelectedHandler = (selectedValue) => {
    this.setState({ shiftSelected: selectedValue });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = async () => {
    const { shiftSelected, nurseSelected } = this.state;

    try {
      fetch(`http://localhost:9001/shifts/${shiftSelected}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nurseID: nurseSelected,
        }),
      })
        .then((res) => {
          console.log(res.json());
          this.setState({ open: false });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { nurseSelected, shiftSelected } = this.state;
    let isSaveEnabled = nurseSelected && shiftSelected;
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container direction="column">
            <Grid>
              <Item>
                <Button variant="outlined" onClick={this.handleClickOpen}>
                  Set Shift Assignment
                </Button>
              </Item>
              <Item>
                <ShiftsListControl></ShiftsListControl>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Dialog fullWidth open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Set Shift Assignment</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ padding: "20px" }}>
              Enter the shift assignment details
            </DialogContentText>
            <Box sx={{ padding: "10px" }}>
              <Grid container direction="column" spacing={3}>
                <Grid>
                  <Item>
                    <ShiftSelectDropDown
                      shiftSelectedHandler={this.shiftSelectedHandler}
                    ></ShiftSelectDropDown>
                  </Item>
                  <Item>
                    <NurseSelectDropDown
                      nurseSelectedHandler={this.nurseSelectedHandler}
                    ></NurseSelectDropDown>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSubmit}
              disabled={!isSaveEnabled}
            >
              Save Assignment
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
