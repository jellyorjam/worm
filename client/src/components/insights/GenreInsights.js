import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate} from "react-router"
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, LabelList, Label} from "recharts";
import { Container, Typography, Box, Button, CardActionArea, Card, CardContent } from "@mui/material";
import NavBar from "../NavBar";
import { useGetBookQuery, useGetWishlistQuery } from "../../reducers/libraryApi";
import ShowTextCheckBox from "../books/ShowTextCheckBox"
import { setShowText } from "../../reducers/accessibilitySlice";
import BackButton from "./BackButton";
import { useGetGenres } from "../../hooks/useGetGenres";
import { renderTopGenres, renderOtherGenres, renderGenreClicked} from "../../functions/renderGenres";

const GenreInsights = ({dashboard}) => {
  const navigate = useNavigate();
  const usersBooks = useSelector(state => state.user.user.books)
  const checked = useSelector(state => state.accessibility.showText)
  const { data: books, error, isLoading } = useGetBookQuery(usersBooks)
  const [genreClicked, setGenreClicked] = useState("")
  const { data, topTenGenres, sortedGenres } = useGetGenres(books)

  if (books) {
 
   const COLORS = [ '#7986CB', '#aed581', '#fff176', '#ff8a65', '#e57373', '#7986CB', '#aed581', '#fff176', '#ff8a65', '#e57373'];



   let checkbox = ""
   if (genreClicked) {
    checkbox = <ShowTextCheckBox/>
   }


 
   if (dashboard) {
       return (
     <div>
       <Container align="center">
         
         <Typography variant="h4" align="center" sx={{paddingBottom: "20px"}}>Your Top Genres</Typography>
        
         <ResponsiveContainer width="100%" height={335}>
         <PieChart >
           <Pie
             dataKey="value"
             nameKey="name"
             isAnimationActive={false}
             data={data}
             cx="50%"
             cy="50%"
             outerRadius={150}
             fill="#8884d8"
             // label={renderCustomizedLabel}
            
           >
         
             {
         data.map((entry, index) => (
           <Cell key={`cell-${index}`} fill={COLORS[index]}/>
         ))
       }
             </Pie>
           <Tooltip/>
         </PieChart>
         </ResponsiveContainer>
       </Container>
    
     </div>
   )
   }
 
   else {
   return (
     <div>
       <NavBar/>
       <Container align="left">
         <BackButton/>
         <Typography variant="h2" align="center">Your Top Genres</Typography>
         <Typography align="center" sx={{paddingBottom: "50px"}}>Click on a slice for more details</Typography>
         <Container sx={{display: "flex"}}>
         <PieChart width={400} height={400} >
           <Pie
             dataKey="value"
             nameKey="name"
             isAnimationActive={false}
             data={data}
             cx="50%"
             cy="50%"
             outerRadius={200}
             fill="#8884d8"
             
           >
         
             {
         data.map((entry, index) => (
           <Cell key={`cell-${index}`} fill={COLORS[index]} onClick={() => setGenreClicked(entry.name)}/>
         ))
       }
             </Pie>
           <Tooltip/>
         </PieChart>
         <Container sx={{display: "flex"}}>
         <Container 
         sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}
         >
           <Typography variant="h4" sx={{textDecoration: "underline"}}>Top 10 Genres</Typography>
           {renderTopGenres(topTenGenres, setGenreClicked)}
         </Container>
         <Container sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
           <Typography variant="h4" sx={{textDecoration: "underline"}}>Runner ups</Typography>
           {renderOtherGenres(sortedGenres, setGenreClicked)}
         </Container>
         </Container>
         </Container>
         <Typography variant="h5">{genreClicked}</Typography>
         {checkbox}
         <Box paddingTop="10px" display="flex" flexWrap="wrap" gap="20px">
 
         {renderGenreClicked(navigate, genreClicked, books, checked)}
         </Box>
       </Container>
    
     </div>
   )
   }
  }
  

  
 

}

export default GenreInsights