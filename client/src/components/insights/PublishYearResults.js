import { useGetYearDetailQuery } from "../../reducers/googleBooksApi";
import { Box, Container, CardActionArea, Skeleton } from "@mui/material";
import { useNavigate } from "react-router"

const PublishYearResults = ({doc}) => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetYearDetailQuery(doc);

  if (isLoading) {
    return (
      <Skeleton variant="rectangular" height={300} width={200}></Skeleton>
    )
  }

  if (data) {

    const englishResult = data.items.find(item => item.volumeInfo.language === "en");
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

export default PublishYearResults