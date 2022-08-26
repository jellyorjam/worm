import { Button, Box, Typography, TextField, Container, Stack, Link} from "@mui/material";
import * as Yup from "yup";
import {useFormik} from "formik";
import axios from 'axios';
import { setUser } from "../reducers/userSlice";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router";
import { useState } from "react";
// import { Link } from "react-router-dom"
import { styled } from "@mui/material/styles"

//remember to map semantic headings for accessibility

// const MyComp = styled('div')({
//   border: "ridge",
//   padding: "10px"

// })

const validationSchema = Yup.object({
  email: Yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: Yup.string('Enter your password').required('Password is required')
})

const Login = () => {
  const navigate = useNavigate();

  const submitLogin = async (values) => {
    await axios.post("http://localhost:8000/users/login", values).then((response) => {
      localStorage.setItem('token', response.data.token);
      navigate("/home")
    });

    
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => submitLogin(values)
  })

  return (
    <Container component={"main"} maxWidth="xs">
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
          <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Typography variant={"h4"} align="center">Login</Typography>
            <TextField id="email" name="email" label="Email" variant="outlined"  value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}/>
            <TextField id="password" name="password" label="Password" variant="outlined"  value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}/>
            <Button type="submit" variant="contained">Let's Go!</Button>
            <Typography variant={"body1"}>New to Worm?   <Link href="/signup">Sign up</Link>
            </Typography>
          </Stack>
          </form>
      </Box>
    </Container>
    
    
  )
};

export default Login;