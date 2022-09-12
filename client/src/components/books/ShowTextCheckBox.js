import { Box, FormGroup, FormControlLabel, Checkbox} from "@mui/material"
import { useState } from "react";
import { setShowText } from "../../reducers/accessibilitySlice";
import { useDispatch, useSelector } from "react-redux";

const ShowTextCheckBox = () => {
  const dispatch = useDispatch();
  const checked = useSelector(state => state.accessibility.showText);

  const handleChange = (event) => {
    dispatch(setShowText(event.target.checked));
  };
  
    return (
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} color="secondary"/>} label="Show Text Details"  />
      </FormGroup>
    )

}

export default ShowTextCheckBox;