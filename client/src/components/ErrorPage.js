import { Typography, Container } from "@mui/material";
import NavBar from "./NavBar";

const ErrorPage = () => {
  return (
    <div>
      <NavBar/>
      <Container>
        <Typography variant="h3">
          Sorry, there was an error. Please try again.
        </Typography>
      </Container>
    </div>
  )
}

export default ErrorPage