import * as Yup from "yup";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import PublishYearRequest from "./PublishYearRequest";
import { Container, Typography, TextField, Button, Box } from "@mui/material"

const DiscoverForm = () => {

  const [searchSubmitted, setSearchSubmitted] = useState("");

  useEffect(() => {
    setSearchSubmitted("")
  }, []);

  const validationSchema = Yup.object({
   year: Yup.number().typeError("Enter a valid number").max(2022, "Cannot be greater than the current year").required("Enter a year")
  });

  const formik = useFormik({
   initialValues: {
     year: ""
   },
   validationSchema: validationSchema,
   onSubmit: (values) => setSearchSubmitted(values)
  });

  let discover = "";
  if (searchSubmitted) {
   discover = <PublishYearRequest search={searchSubmitted}/>
  }
  
  return (
    <div>
      <Container align="left" sx={{padding: "20px", display: "flex", gap: "20px", alignItems: "flex-end"}}>
         <Typography sx={{fontSize: "25px"}}>I want to read a book published in</Typography>
         <form onSubmit={formik.handleSubmit}>
          <TextField id="year-published" name="year" label="Year" variant="standard" color="secondary" value={formik.values.year} onChange={formik.handleChange} error={formik.touched.year && Boolean(formik.errors.year)} helperText={formik.touched.year && formik.errors.year} sx={{}}/>
          <Button type="submit" variant="contained" color="secondary" sx={{marginTop: "15px", marginLeft: "20px"}}>Submit</Button>
        </form>
      </Container>
        <Box display="flex" gap="10px" overflow="auto">
          {discover}
        </Box> 
    </div>
  )
};

export default DiscoverForm;