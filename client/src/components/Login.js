import { Button, Typography, TextField, Container, Stack, Link} from "@mui/material";
import * as Yup from "yup";
import {useFormik} from "formik";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router";
import { url } from "../config/keys"

//remember to map semantic headings for accessibility

const validationSchema = Yup.object({
  email: Yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: Yup.string('Enter your password').required('Password is required')
})

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const submitLogin = async (values) => {
    await axios.post(url + "/users/login", values).then((response) => {
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

  const renderMessage = () => {
    if (state) {
      return (
        <Typography variant="body1" component="h1">Account successfully created. Please log in.</Typography>
      )
    }
   }

  return (
    <Container maxWidth={false} sx={{
      backgroundImage: `url(${"../../images/bookshelf.jpg"})`, backgroundSize: "1400px",
      backgroundPosition: "end"}}>    
      <Container component={"main"} maxWidth="xs" align="center" sx={{minHeight:"100vh", paddingTop: "40px"}}>
        {renderMessage()}
        <img src={"../../favicon.ico"} alt="little worm"/>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} sx={{backgroundColor: "white"}}>
            <Typography variant="h4" component="h2" align="center">Login</Typography>
            <TextField color="secondary"  id="email" name="email" label="Email" variant="outlined"  value={formik.values.email}
            onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email}/>

            <TextField id="password" type="password" color="secondary" name="password" label="Password" variant="outlined"      value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password}/>

            <Button type="submit" variant="contained" color="secondary" sx={{width: "100px", alignSelf: "center"}}>
              Let's Go!
            </Button>
            <Typography variant="body1">New to Worm?   <Link href="/signup" sx={{color: "#558b2f"}}>Sign up</Link>
            </Typography>
          </Stack>
        </form>
      </Container>
    </Container>
    
    
  )
};

export default Login;