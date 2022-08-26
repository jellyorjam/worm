import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, LabelList, Label} from "recharts";
import { Container, Typography } from "@mui/material"


const GenreInsights = () => {
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

  const COLORS = [ '#BC5110', '#870000', '#524C00', '#00363A', '#560027', '#BC5110', '#870000', '#524C00', '#00363A', '#560027'];

  const renderCustomizedLabel = ({
    x, y, name
  }) => {
    if (y > 300 && y < 302) {
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
    }
  
  };
 
  

 
  return (
    <div>
      <Container align="center">
        <Typography>Genre</Typography>
        <ResponsiveContainer width="100%" height={400}>
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

export default GenreInsights