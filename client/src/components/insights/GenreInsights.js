import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate} from "react-router"
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, LabelList, Label} from "recharts";
import { Container, Typography, Box, Button, CardActionArea, Card, CardContent } from "@mui/material";
import NavBar from "../NavBar";
import { useGetBookQuery, useGetWishlistQuery } from "../../reducers/libraryApi";
import ShowTextCheckBox from "../ShowTextCheckBox"
import { setShowText } from "../../reducers/accessibilitySlice";

const GenreInsights = ({dashboard}) => {
  const navigate = useNavigate();
  const usersBooks = useSelector(state => state.user.user.books)
  const usersWishlist = useSelector(state => state.user.user.wishlist)
  const checked = useSelector(state => state.accessibility.showText)

  const { data: books, error, isLoading } = useGetBookQuery(usersBooks)
  const { data: wishlist } = useGetWishlistQuery(usersWishlist)

  const [genreClicked, setGenreClicked] = useState("")

  const allGenres = [];

  if (books) {
    books.forEach((book) => {
      book.googleCategories.forEach(category => {
        allGenres.push(category)
      })
    })
 
   const count = {}
 
   allGenres.forEach((genre) => {
     count[genre] = (count[genre] || 0) + 1;  
    });
 
   const sortableGenres = [];
   for (let genre in count) {
     sortableGenres.push([genre, count[genre]])
   }
 
   const sortedGenres = sortableGenres.sort((a, b) => {
     return b[1] - a[1]
   })
 
   const topTenGenres = sortedGenres.slice(0, 10);
   
   const data = topTenGenres.map((genre) => {
     return {
       "name": genre[0],
       "value": genre[1]
     }
   })
 
   const COLORS = [ '#7986CB', '#aed581', '#fff176', '#ff8a65', '#e57373', '#7986CB', '#aed581', '#fff176', '#ff8a65', '#e57373'];
 
   // const renderCustomizedLabel = ({
   //   x, y, name
   // }) => {
   //     if (x > 345 && x < 350) {
   //       return (
   //         <text x={x + 80} y={y + 10} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
   //           {name}  
   //         </text>
   //       );
   //     }
   //     if (x > 290 && x < 330){
   //       return (
   //         <text x={x + 40} y={y + 10} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
   //           {name}  
   //         </text>
   //       );
   //     }
   
   //     if (x > 230 && x < 289){
   //       return (
   //         <text x={x + 70} y={y + 20} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
   //           {name}  
   //         </text>
   //       );
   //     }
   //     if (x > 180 && x < 229) {
   //       return (
   //         <text x={x + 20} y={y + 5} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
   //           {name}  
   //         </text>
   //       );
   //     }
   //     if (x > 100 && x < 179) {
   //       return (
   //         <text x={x - 2} y={y} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
   //           {name}  
   //         </text>
   //       );
   //     }
   //     if (x > 379) {
   //       return (
   //         <text x={x + 100} y={y} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
   //           {name}  
   //         </text>
   //       );
   //     }
   //     else {
   //       return (
   //         <text x={x + 55} y={y - 2} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
   //           {name}  
   //         </text>
   //       );
   //   }
   
   
   // };
 
 
   const renderTopGenres = () => {

     return topTenGenres.map((genre, i) => {
       return (
         <CardActionArea onClick={(e) => setGenreClicked(e.target.firstChild.textContent)}>
           <Typography sx={{fontSize: "20px"}}>{genre[0]} - {genre[1]}</Typography>
         </CardActionArea>
       )
     })
   }
 
   const renderOtherGenres = () => {
     const top20 = sortedGenres.slice(10, 20);
     return top20.map((genre, i) => {
       return (
         <CardActionArea onClick={(e) => setGenreClicked(e.target.firstChild.textContent)}>
           <Typography sx={{fontSize: "20px"}}>{genre[0]} - {genre[1]}</Typography>
         </CardActionArea>
       )
     })
   }
 
   const showBook = (book) => {
     const link = book.googleLink
     const splitLink = link.split("/");
     const selfLink = splitLink[splitLink.length - 1];
     navigate("/books/" + book.title, {state: selfLink})
   }

   let checkbox = ""
   if (genreClicked) {
    checkbox = <ShowTextCheckBox/>
   }

 
   const renderGenreClicked = () => {
     
     if (genreClicked) {
      return books.map((book) => {
         return book.googleCategories.map((category) => {
           if (category === genreClicked) {
             return (
               <CardActionArea sx={{width: "125px", height: "auto"}} onClick={() => showBook(book)}>
                 
                 <img src={book.image} alt="book cover"></img>
                 {checked ? <div>
                  <Typography>{book.title}</Typography>
                  <Typography>{book.authors[0]}</Typography>
                </div> : ""}
        
               </CardActionArea>
                 
           
             )
           }
         })
       })
     }
  
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
         
         <Typography variant="h2" align="center" sx={{ paddingTop: "20px"}}>Your Top Genres</Typography>
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
           {renderTopGenres()}
         </Container>
         <Container sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
           <Typography variant="h4" sx={{textDecoration: "underline"}}>Runner ups</Typography>
           {renderOtherGenres()}
         </Container>
         </Container>
         </Container>
         <Typography variant="h5">{genreClicked}</Typography>
         {checkbox}
         <Box paddingTop="10px" display="flex" flexWrap="wrap" gap="20px">
 
         {renderGenreClicked()}
         </Box>
       </Container>
    
     </div>
   )
   }
  }

  
 

}

export default GenreInsights