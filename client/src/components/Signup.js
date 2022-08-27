import { Button, Box, Typography, TextField, Container, Stack, Link} from "@mui/material"
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup"
import axios from "axios"
import Login from "./Login"

const validationSchema = Yup.object({
  firstName: Yup
    .string('Enter your first name')
    .max(25, 'Name must be less than 25 characters')
    .required('First name is required'),
  lastName: Yup
    .string('Enter your last name')
    .max(25, 'Name must be less than 25 characters')
    .required('Last name is required'),
  email: Yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string('Enter a password')
    .min(8, 'Password must be a minimum of 8 characters')
    .required('Password is required'),
  passwordConfirmation: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
})

const Signup = () => {
  const navigate = useNavigate();

  const signup =  async (values) => {
    await axios.post("http://localhost:8000/users/signup", values).then((response) => {
      
      return navigate("/login", {state: "success"})
    });
    
  }


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => signup(values)
  })
  return (
    <Container component={"main"} align="center" maxWidth="xs">
     <img src={"../../images/croppedworm.jpg"} alt="little worm"/>
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
     >
        <Stack spacing={2}>
          <Typography variant={"h4"} align="center">Signup</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <TextField id="firstName" name="firstName" label="First Name" variant="outlined" color="secondary"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}/>
              <TextField id="lastName" name="lastName" label="Last Name" variant="outlined" color="secondary"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}/>
              <TextField id="email" name="email" label="Email" variant="outlined" color="secondary"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}/>
              <TextField id="password" name="password" type="password" label="Create Password" variant="outlined" color="secondary"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}/>
              <TextField id="passwordConfirmation" type="password" name="passwordConfirmation" label="Confirm Password" color="secondary" variant="outlined" 
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
              helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}/>
              <Button variant="contained" color="secondary" type="submit">Let's Go!</Button>
             </Stack>
          </form>
          <Typography variant={"body1"}>Already have an account?   <Link href="login" color="secondary">Log in</Link></Typography>
        </Stack>
    </Box>
    
  </Container>
  )
}

export default Signup