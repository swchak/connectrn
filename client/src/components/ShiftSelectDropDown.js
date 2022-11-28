import * as React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default class ShiftSelectDropDown extends React.Component {
  constructor() {
    super();
    this.state = {
      shifts: [],
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.shiftSelectedHandler(event.target.value);
  };

  componentDidMount() {
    fetch("http://localhost:9001/shifts")
      .then((response) => response.json())
      .then((res) => this.setState({ shifts : res }))
      .catch((reason) => console.log(reason));
  }

  toLocalDateTime = (utcDateTimeStr) => {
    const utcDateTime = new Date(utcDateTimeStr);
    return (
      utcDateTime.toLocaleDateString("en-us") +
      " " +
      utcDateTime.toLocaleTimeString("en-us")
    );
  };
  render() {
    return (
      <div>
        <Box>
          <FormControl fullWidth>
            <InputLabel>Select Shift</InputLabel>
            <Select label="Select Shift" variant='outlined' value={this.state.value} onChange={this.handleChange}>
              <MenuItem defaultValue>Select Shift</MenuItem>
              {this.state.shifts.filter((shift) => shift.nurse_id === null).map((shift, index) => (
                <MenuItem key={index} value={shift.id}>
                  {shift.name} {this.toLocalDateTime(shift.start)} {this.toLocalDateTime(shift.end)} {shift.qual_required}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    );
  }
}
