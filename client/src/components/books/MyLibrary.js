import NavBar from "../NavBar";
import { useLoginHook } from "../../hooks/useLoginHook";
import { useSelector} from "react-redux";
import { useGetBookQuery } from "../../reducers/libraryApi";
import { Container, Skeleton } from "@mui/material";
import ErrorPage from "../ErrorPage";
import YourBooks from "./YourBooks";


const MyLibrary = () => {

  const books = useSelector(state => state.user.user.books);
  const { loggedIn } = useLoginHook();
  const { data, isLoading, error } = useGetBookQuery(books);

  const renderYourBooks = () => {
    if (data) {
      return (
        <YourBooks data={data} type="Library"/>
      )
    }
    if (isLoading) {
      return (<Skeleton variant="rectangular" height={300} width={200}></Skeleton>)
    }

    if (error) {
      return (<ErrorPage/>)
    }
  }

  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Container >
         {renderYourBooks()}
        </Container>
      </div>
    )
  }
 
}

export default MyLibrary;