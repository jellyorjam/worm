import { useSelector } from "react-redux";

export const useCreateBookObj = (book) => {
  const userId = useSelector(state => state.user.user._id);
  const categories = book.volumeInfo.categories;
  const organizedCategories = [];
  
    if (categories) {
      categories.map((category) => {
        if(category.includes(" / ")) {
          const splitCategories = category.split(" / ");
          splitCategories.map((category) => {
            if (!organizedCategories.includes(category) && category !== "General") {
              organizedCategories.push(category)
            }
            return organizedCategories;
          })
        }
        return organizedCategories;
      })
    }
  
    const bookObj = {
      user: userId,
      type: "library",
      selfLink: book.selfLink || "",
      title: book.volumeInfo.title || "",
      authors: book.volumeInfo.authors || [],
      pageCount: book.volumeInfo.pageCount || "",
      image: book.volumeInfo.imageLinks.thumbnail || "",
      categories: organizedCategories || []
    }
  
    const wishlistObj = {...bookObj, type: "wishlist"};

    let formattedDescription = "";
    const description = book.volumeInfo.description;
        if (description) {
          const d1 = description.replaceAll('<br>', '<br/>');
          const d2 = d1.replaceAll('<b>', '');
          const d3 = d2.replaceAll('<i>', '');
          const d4 = d3.replaceAll('</i>', '');
          const d5 = d4.replaceAll('</b>', '');
          formattedDescription = d5;
      
          // return {__html: formattedDescription}
        }
        else {
          formattedDescription = "No description available"
          // return {__html: "No description available"}
        }

    const date = book.volumeInfo.publishedDate;
    let newDate = "";
    if (date) {
      newDate = new Date(date).toLocaleDateString('en-us', {month:"short", day:"numeric", year:"numeric"}) 
          }

    return {
      categories,
      wishlistObj,
      bookObj,
      formattedDescription,
      newDate

    }
}