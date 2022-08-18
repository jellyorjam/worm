import { Button, Box, Typography, TextField, Container, Stack, Link} from "@mui/material"
// import { Link } from "react-router-dom"
import { styled } from "@mui/material/styles"

//remember to map semantic headings for accessibility

// const MyComp = styled('div')({
//   border: "ridge",
//   padding: "10px"

// })


const Login = () => {


  return (
    
    <Container component={"form"} maxWidth="xs">
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
          <Stack spacing={2}>
            <Typography variant={"h4"} align="center">Login</Typography>
            <TextField id="outlined-basic" label="Email" variant="outlined"/>
            <TextField id="outlined-basic" label="Password" variant="outlined"/>
            <Button variant="contained">Let's Go!</Button>
            <Typography variant={"body1"}>New to Worm?   <Link href="/signup">Sign up</Link>
            </Typography>
          </Stack>
      </Box>
    </Container>
    
    
  )
};

export default Login;