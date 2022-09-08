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
    
    
    const englishResult =  data.items ? data.items.find(item => item.volumeInfo.language === "en") : null;

    if (englishResult) {
      console.log(englishResult)
      if (englishResult.volumeInfo.authors) {
        if (doc.includes(englishResult.volumeInfo.authors[0])) {
          if (englishResult.volumeInfo.imageLinks) {
            const link = englishResult.selfLink;
            const splitLink = link.split("/");
            const selfLink = splitLink[splitLink.length - 1];
            return (
              <CardActionArea onClick={() => navigate("/books/" + englishResult.volumeInfo.title, {state: selfLink})}>
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