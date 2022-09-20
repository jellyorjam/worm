import { useSelector } from "react-redux";
import { useState } from "react";
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, } from "recharts"
import { Box, Typography, Container } from "@mui/material";
import NavBar from "../NavBar";
import { useNavigate } from "react-router"
import BackButton from "./BackButton";
import { renderTitle, renderDecadeTitle } from "../../functions/renderTitles";
import DiscoverForm from "./DiscoverForm";
import { useCountYears } from "../../hooks/useCountYears";

const PublishYearInsights = (props) => {
  const insights = useSelector(state => state.insights)
  const checked = useSelector(state => state.accessibility.showText)
  const [isClicked, setClick] = useState(false);
  const [yearClicked, setYearClicked] = useState("");
  const [decadeIsClicked, setDecadeIsClicked] = useState("");
  const [decadeClicked, setDecadeClicked] = useState("")

  const { dashboard } = props;
  const navigate = useNavigate()

  const { data, dataForDecades} = useCountYears(insights)

  let nav = "";
  if (!dashboard) {
    nav = <NavBar/>
  }

  let detail = "";
  if (!dashboard) {
    detail = <Typography>Click on a bar for more details</Typography>
  }

  let renderInput = "";
  if (!dashboard) {
    renderInput = <DiscoverForm/>
  }

  let detailedChart = "";
  if (!dashboard) {
    detailedChart =  <ResponsiveContainer width={insights.sortedByYear.length > 5 ? "100%" : "50%"} height={300}>
    <BarChart data={data} >
      <XAxis dataKey="name" />
      <YAxis type="number" allowDecimals={false}/>
      <Tooltip />
      <Bar dataKey="Books" maxBarSize={100} fill="#6a1b9a" onClick={(e) => {
        setClick(true);
        setYearClicked(e)
      }}></Bar>
    </BarChart>
    </ResponsiveContainer>
  }

  return (
    <div>
      {nav}
      <Box>
        <Container align={dashboard ? "left" : "center"}>
          {dashboard ? "" : <Container align="left"><BackButton/></Container>}
          <Typography variant={dashboard ? "h4" : "h2"} align="center" sx={dashboard ? {paddingBottom: "40px", paddingLeft: "60px"} : {paddingTop: "20px"}}>Publish Year Insights</Typography>
          {detail}
          <ResponsiveContainer width={dashboard ? "100%" : "50%"} height={300}>
            <BarChart data={dataForDecades} >
              <XAxis dataKey="name" />
              <YAxis type="number" allowDecimals={false}/>
              <Tooltip />
              <Bar dataKey="Books" maxBarSize={100} fill="#6a1b9a" onClick={(e) => {
                setDecadeIsClicked(true);
                setDecadeClicked(e)
              }}></Bar>
            </BarChart>
          </ResponsiveContainer>
          {renderDecadeTitle(decadeIsClicked, dashboard, decadeClicked, insights, checked, navigate)}
          {detailedChart}
          {renderTitle(isClicked, dashboard, insights, yearClicked, checked, navigate)}
          {renderInput}
       </Container>
      </Box>
    </div>
  )
};

export default PublishYearInsights