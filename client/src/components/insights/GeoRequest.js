import { Skeleton } from "@mui/material";
import { useGetPlaceQuery } from "../../reducers/openLibraryApi";
import DiscoverResults from "./DiscoverResults";

const GeoRequest = ({state}) => {

  const { data, error, isLoading } = useGetPlaceQuery(state)
  
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
          <DiscoverResults doc={doc}/>
      )
    })
  }
};

export default GeoRequest;