import { useGetYearDetailQuery } from "../../reducers/googleBooksApi";
import { Box, Container, CardActionArea, Skeleton } from "@mui/material";
import { useNavigate } from "react-router"

const DiscoverResults = ({doc}) => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetYearDetailQuery(doc);

  if (isLoading) {
    return (
      <Skeleton variant="rectangular" height={300} width={200}></Skeleton>
    )
  }

  if (data) {
    console.log(data)
    
    const englishResult =  data.items ? data.items.find(item => item.volumeInfo.language === "en") : null;

    if (englishResult) {
      if (englishResult.volumeInfo.authors) {
        if (doc.includes(englishResult.volumeInfo.authors[0])) {
          if (englishResult.volumeInfo.imageLinks) {
            return (
              <CardActionArea onClick={() => navigate("/books/" + englishResult.volumeInfo.title, {state: englishResult})}>
                <img src={englishResult.volumeInfo.imageLinks.thumbnail} alt="book cover"></img>
              </CardActionArea>  
        )
        }
     
      }
      }
    }
  
  
}
}

export default DiscoverResults