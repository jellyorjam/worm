import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate} from "react-router"
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { Container, Typography, Box } from "@mui/material";
import NavBar from "../NavBar";
import { useGetBookQuery } from "../../reducers/libraryApi";
import ShowTextCheckBox from "../books/ShowTextCheckBox"
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

   let showGenres = <div></div>;
   if (!dashboard) {
    showGenres = <Container sx={{display: "flex"}}>
      <Container sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
        <Typography variant="h4" sx={{textDecoration: "underline"}}>Top 10 Genres</Typography>
        {renderTopGenres(topTenGenres, setGenreClicked)}
      </Container>
      <Container sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
        <Typography variant="h4" sx={{textDecoration: "underline"}}>Runner ups</Typography>
        {renderOtherGenres(sortedGenres, setGenreClicked)}
      </Container>
    </Container>
   }

   let showGenreClicked = "";
   if (!dashboard) {
     showGenreClicked = <div>
      <Typography variant="h5">{genreClicked}</Typography>
        {checkbox}
        <Box paddingTop="10px" display="flex" flexWrap="wrap" gap="20px">
          {renderGenreClicked(navigate, genreClicked, books, checked)}
        </Box>
    </div>
   }

   return (
     <div>
       {dashboard ? "" : <NavBar/>}
       <Container align={dashboard ? "center" : "left"}>
         {dashboard ? "" : <BackButton/>}
         <Typography variant={dashboard ? "h4" : "h2"} align="center" sx={dashboard ? {paddingBottom: "20px"} : {}}>Your Top Genres</Typography>
         {dashboard ? "" : <Typography align="center" sx={{paddingBottom: "50px"}}>Click on a slice for more details</Typography>}
         <Container sx={dashboard ? {} : {display: "flex"}}>
          <PieChart width={400} height={dashboard ? 335 : 400} >
            <Pie
              dataKey="value"
              nameKey="name"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={dashboard ? 150 : 200}
              fill="#8884d8" 
            >
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} onClick={() => setGenreClicked(entry.name)}/>
              ))}
             </Pie>
           <Tooltip/>
          </PieChart>
          {showGenres}
        </Container>
          {showGenreClicked}
      </Container>
     </div>
   )
  }
};

export default GenreInsights;