import * as React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { toLocalDateTime } from "../utils/utils";
import { fetchShiftList } from "../services/services";

export default class ShiftSelectDropDown extends React.Component {
  constructor() {
    super();
    this.state = {
      shifts: [],
      value: "",
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.shiftSelectedHandler(event.target.value);
  };

  componentDidMount() {
    fetchShiftList()
      .then((res) => this.setState({ shifts: res }))
      .catch((error) => console.log("could not fetch shifts"));
    // fetch("http://localhost:9001/shifts")
    //   .then((response) => response.json())
    //   .then((res) => this.setState({ shifts: res }))
    //   .catch((reason) => console.log(reason));
  }

  render() {
    return (
      <div>
        <Box>
          <FormControl fullWidth>
            <InputLabel>Select Shift</InputLabel>
            <Select
              label="Select Shift"
              variant="outlined"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem defaultValue>Select Shift</MenuItem>
              {this.state.shifts
                .filter((shift) => shift.nurse_id === null)
                .map((shift, index) => (
                  <MenuItem key={index} value={shift.id}>
                    {shift.name} {toLocalDateTime(shift.start)}{" "}
                    {toLocalDateTime(shift.end)} {shift.qual_required}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    );
  }
}
