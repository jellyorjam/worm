import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label, ResponsiveContainer } from "recharts"
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import NavBar from "../NavBar";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import PublishYearRequest from "./PublishYearRequest";



const PublishYearInsights = (props) => {
  const insights = useSelector(state => state.insights)
  const [isClicked, setClick] = useState(false);
  const [yearClicked, setYearClicked] = useState("");
  const [decadeIsClicked, setDecadeIsClicked] = useState("");
  const [decadeClicked, setDecadeClicked] = useState("")
  const [searchSubmitted, setSearchSubmitted] = useState("");
  const [responseData, setResponseData] = useState({})
  const { dashboard } = props;

  useEffect(() => {
    setSearchSubmitted("")
  }, []);

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

  const countDecades = {};

  const countDecadesFunc = insights.sortedByYear.forEach((book) => {
    countDecades[book.firstPublishYear.substring(0, 2)] = (countDecades[book.firstPublishYear.substring(0, 2)] || 0) + 1;  
   })

   const countDecadesKeys = Object.keys(countDecades);

  const dataForDecades = countDecadesKeys.map((key) => {
   return {
     "name": key + "00's",
     "Books": countDecades[key],
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
          <Container align="left">
          <Typography variant="h6" sx={{textDecoration: "underline"}}>Books Published in {yearClicked.name}</Typography>
          <Typography>{mapTitles()}</Typography>
          </Container>
        </div>
      )
    }
 }

 const renderDecadeTitle = () => {
  if (decadeIsClicked && !dashboard) {
    const booksOfYear = insights.sortedByYear.filter((book) => {
    return book.firstPublishYear.substring(0, 2) === decadeClicked.name.substring(0, 2)
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
        <Container align="left">
          <Typography variant="h6" sx={{textDecoration: "underline"}}>Books Published in {decadeClicked.name}</Typography>
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
 };


 // figure out if i can search BCE

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


 const renderInput = () => {
   if (!dashboard) {
     return (
       <Container align="left" sx={{padding: "20px", display: "flex", gap: "20px", alignItems: "flex-end"}}>
         
         <Typography sx={{fontSize: "25px"}}>I want to read a book published in</Typography>
         <form onSubmit={formik.handleSubmit}>
         <TextField id="year-published" name="year" label="Year" variant="standard" color="secondary" value={formik.values.year} onChange={formik.handleChange} error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year} sx={{}}/>
         <Button type="submit" variant="contained" color="secondary" sx={{marginTop: "15px", marginLeft: "20px"}}>Submit</Button>
         </form>
         
       </Container>
     )
   }
 }

 const renderDiscover = () => {
   if (searchSubmitted) {
     return (
     
         <PublishYearRequest search={searchSubmitted}/>
     
       
     )
   }
 }

 const renderDetailedChart = () => {
   if (!dashboard) {
     return (
      <ResponsiveContainer width={insights.sortedByYear.length > 5 ? "100%" : "50%"} height={300}>
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
     )
   }
 }

  return (
    <div>
      {renderNav()}
      <Box>
        <Container align={dashboard ? "left" : "center"}>
          <Typography variant={dashboard ? "h4" : "h2"} align="center" sx={dashboard ? {paddingBottom: "40px", paddingLeft: "60px"} : {paddingTop: "20px"}}>Publish Year Insights</Typography>
          {renderDetail()}

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
          {renderDecadeTitle()}
          {renderDetailedChart()}
          {renderTitle()}
          {renderInput()}
          <Box display="flex" gap="10px" overflow="auto">
          {renderDiscover()}
          </Box>
       </Container>
      
      
      </Box>
    </div>
  )
}



export default PublishYearInsights