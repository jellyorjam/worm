import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, LabelList, Label} from "recharts";
import { Container, Typography, Box } from "@mui/material";
import NavBar from "../NavBar";


const GenreInsights = ({dashboard}) => {
  const books = useSelector(state => state.insights.sortedByYear);

  const allGenres = [];

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

  const renderCustomizedLabel = ({
    x, y, name
  }) => {
    // if (dashboard) {
      if (x > 345 && x < 350) {
        return (
          <text x={x + 80} y={y + 10} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
            {name}  
          </text>
        );
      }
      if (x > 300 && x < 310){
        return (
          <text x={x + 40} y={y + 10} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
            {name}  
          </text>
        );
      }
  
      if (x > 250 && x < 270){
        return (
          <text x={x + 70} y={y + 20} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
            {name}  
          </text>
        );
      }
      if (x > 202 && x < 210) {
        return (
          <text x={x + 20} y={y + 10} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
            {name}  
          </text>
        );
      }
      if (x > 100 && x < 160) {
        return (
          <text x={x - 2} y={y} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
            {name}  
          </text>
        );
      }
      if (x > 370) {
        return (
          <text x={x + 60} y={y} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
            {name}  
          </text>
        );
      }
      else {
        return (
          <text x={x + 55} y={y - 2} fontFamily="Lora" fill="black" textAnchor="end" dominantBaseline="central">
            {name}  
          </text>
        );
      // }
    }
  
  
  };


  const renderTopGenres = () => {
    return topTenGenres.map((genre, i) => {
      return (
        <Typography key={i} sx={{fontSize: "20px"}}>{genre[0]} - {genre[1]}</Typography>
      )
    })
  }

  const renderOtherGenres = () => {
    const top20 = sortedGenres.slice(10, 20);
    return top20.map((genre, i) => {
      return (
        <Typography key={i} sx={{fontSize: "20px"}}>{genre[0]} - {genre[1]}</Typography>
      )
    })
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
            outerRadius={120}
            fill="#8884d8"
            label={renderCustomizedLabel}
           
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
        
        <Typography variant="h2" align="center" sx={{paddingBottom: "50px"}}>Your Top Genres</Typography>
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
          <Cell key={`cell-${index}`} fill={COLORS[index]}/>
        ))
      }
            </Pie>
          <Tooltip/>
        </PieChart>
        <Container sx={{display: "flex"}}>
        <Container>
          <Typography variant="h4" sx={{textDecoration: "underline"}}>Top 10 Genres</Typography>
          {renderTopGenres()}
        </Container>
        <Container>
          <Typography variant="h4" sx={{textDecoration: "underline"}}>Runner ups</Typography>
          {renderOtherGenres()}
        </Container>
        </Container>
        </Container>
      </Container>
   
    </div>
  )
  }
 

}

export default GenreInsights