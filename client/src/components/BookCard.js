import { useGetBookQuery } from "../reducers/libraryApi";

const BookCard = (props) => {
  
  const bookId = props.book;
  const { data, error, isLoading } = useGetBookQuery(bookId)
  console.log(data)

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  if (error) {
    return (
      <div>ERROR</div>
    )
  }
  if (data) {
    return (
      <div>{data.title}</div>
    )
  }
}

export default BookCard;