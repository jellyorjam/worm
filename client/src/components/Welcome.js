import { Button, Box, Typography } from "@mui/material"


const Welcome = () => {

  const testFunc = () => {
    console.log('clik!')
  }
  return (
    <div>
      <Typography variant="h1">Hello, World!</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Button variant="contained" onClick={testFunc}>Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Box>
    </div>
  )
};

export default Welcome;