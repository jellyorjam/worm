import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const BackButton = () => {

  const navigate = useNavigate();
  
  return (
    <Button variant="contained" color="secondary" sx={{marginTop: "40px", marginLeft: "40px"}} onClick={() => navigate(-1)}>Back to Insights</Button>
  )
};

export default BackButton;