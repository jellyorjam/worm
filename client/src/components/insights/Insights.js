import { useGetBookQuery } from "../../reducers/libraryApi";
import { useSelector } from "react-redux";
import InsightsDashboard from "./InsightsDashboard";


const Insights = () => {
  const usersBooks = useSelector(state => state.user.user.books)
  const { data: books, error, isLoading } = useGetBookQuery(usersBooks)

  const library = books

  return (
    <InsightsDashboard library={library}/>
  )

}

export default Insights;