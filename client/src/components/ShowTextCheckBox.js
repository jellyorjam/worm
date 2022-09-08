import { Box, FormGroup, FormControlLabel, Checkbox} from "@mui/material"
import { useState } from "react"

const ShowTextCheckBox = ({data}) => {

  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  
  if (data) {
    return (
      <Box display="flex" justifyContent="center">
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} color="secondary"/>} label="Show Text Details"  />
      </FormGroup>
      </Box>
    )
  }
}

export default ShowTextCheckBox