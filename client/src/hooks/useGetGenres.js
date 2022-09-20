//counts books in users library based on genre

export const useGetGenres = (books) => {
  const allGenres = [];

  if (books) {
    books.forEach((book) => {
      book.googleCategories.forEach(category => {
        allGenres.push(category)
    })
  })
 
  const count = {}
 
  allGenres.forEach((genre) => {
     count[genre] = (count[genre] || 0) + 1;  
    });
 
   const sortableGenres = [];
   for (let genre in count) {
     sortableGenres.push([genre, count[genre]])
   }
 
   const sortedGenres = sortableGenres.sort((a, b) => {
     return b[1] - a[1]
   })
 
   const topTenGenres = sortedGenres.slice(0, 10);
   
   const data = topTenGenres.map((genre) => {
     return {
       "name": genre[0],
       "value": genre[1]
     }
   })

   return {
     data, topTenGenres, sortedGenres
   }
  } 
}