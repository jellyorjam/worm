import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useInsights = () => {
  const library = useSelector(state => state.books)

  useEffect(() => {
    const bookWithMostPages = findLongestBook();
    const bookWithLeastPages = findShortestBook();
    const sortedArray = organizeByYear();

    return {
      bookWithMostPages,
      bookWithLeastPages,
      sortedArray
    }
  }, [])


  const findLongestBook = () => {
    let bookWithMostPages = {
      pageCount: 0
    }

    return library.map((book) => {
      if (book.pageCount > bookWithMostPages.pageCount) {
        bookWithMostPages = book
      }
      return bookWithMostPages
    })
  };

  const findShortestBook = () => {
    let bookWithLeastPages = {
      pageCount: 10000000000
    }

    return library.map((book) => {
      if (book.pageCount < bookWithLeastPages.pageCount) {
        bookWithLeastPages = book
      }
      return bookWithLeastPages
    })
  };

  const organizeByYear = () => {
    const sortLibrary = [...library]
    const sortedArray = sortLibrary.sort((a, b) => parseInt(a.firstPublishYear) - parseInt(b.firstPublishYear));
    return sortedArray;
  }

}