import * as React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem} from "@mui/material";

export default class NurseSelectDropDown extends React.Component {
  constructor() {
    super();
    this.state = {
      nurses: [],
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.nurseSelectedHandler(event.target.value);
  };


  componentDidMount() {
    fetch("http://localhost:9001/nurses")
      .then((response) => response.json())
      .then((res) => this.setState({ nurses : res }))
      .catch((reason) => console.log(reason));
  }

  render() {
    return (
      <div>
        <Box>
          <FormControl fullWidth margin="dense">
            <InputLabel>Select Nurse</InputLabel>
            <Select
              label="Select Nurse"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem defaultValue>Select Nurse</MenuItem>
              {this.state.nurses.map((nurse, index) => (
                <MenuItem key={index} value={nurse.id}>
                  {nurse.first_name} {nurse.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    );
  }
}
