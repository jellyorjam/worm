import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label, ResponsiveContainer } from "recharts"
import { Box, Typography, Container } from "@mui/material";
import NavBar from "../NavBar";



const PublishYearInsights = (props) => {
  const insights = useSelector(state => state.insights)
  const [isClicked, setClick] = useState(false);
  const [yearClicked, setYearClicked] = useState("")
  const { dashboard } = props;
  console.log(dashboard)
  const count = {};

  const countYears = insights.sortedByYear.forEach((book) => {
    count[book.firstPublishYear] = (count[book.firstPublishYear] || 0) + 1;  
   })

   const countKeys = Object.keys(count);

  const data = countKeys.map((key) => {
   return {
     "name": key,
     "Books": count[key],
    }
  })

  const renderTitle = () => {
    if (isClicked && !dashboard) {
      const booksOfYear = insights.sortedByYear.filter((book) => {
      return book.firstPublishYear === yearClicked.name
      })

      const mapTitles = () => {
        return booksOfYear.map((book) => {
          return (
            <div>{book.title} by {book.authors[0]}</div>
          )
        })
       }

     
      return (
        <div>
          <Container sx={{marginLeft: "250px"}}>
          <Typography variant="h6" sx={{textDecoration: "underline"}}>Books Published in {yearClicked.name}</Typography>
          <Typography>{mapTitles()}</Typography>
          </Container>
        </div>
      )
    }
 }
 const renderNav = () => {
   if (!dashboard) {
     return (
       <div>
         <NavBar/>
       </div>
     )
   }
 }

 const renderDetail = () => {
   if (!dashboard) {
     return (
       <Typography>Click on a bar for more details</Typography>
     )
   }
 }


  return (
    <div>
      {renderNav()}
      <Box>
        <Container align={dashboard ? "left" : "center"}>
          <Typography variant="h4" align="center" sx={{paddingTop: "10px"}}>Publish Year Insights</Typography>
          {renderDetail()}
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Books"fill="#388e3c" onClick={(e) => {
              setClick(true);
              setYearClicked(e)
            }}></Bar>
          </BarChart>
          </ResponsiveContainer>
       </Container>
      {renderTitle()}
      </Box>
    </div>
  )
}

//make anoter graph grouped by century


export default PublishYearInsights