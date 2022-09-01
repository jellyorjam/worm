import { useEffect } from "react";
import { useGetYearQuery } from "../../reducers/openLibraryApi";
import PublishYearResults from "./PublishYearResults";
import { Skeleton } from "@mui/material";

const PublishYearRequest = ({search}) => {

  const year = search.year;
  

  const { data, error, isLoading } = useGetYearQuery(year);

  if (isLoading) {
    return (
      <Skeleton variant="rectangular" height={300} width={200}></Skeleton>
    )
  }



  if (data) {
    const titleAndAuthor = [];
    
    data.docs.forEach((doc) => {
        if (doc.title && doc.author_name) {
          titleAndAuthor.push(doc.title + " " + doc.author_name[0]);
        }
      })

    return titleAndAuthor.map((doc) => {
    
      return (
      
          <PublishYearResults doc={doc}/>
   
      )
    })
   
  }
 

}

export default PublishYearRequest