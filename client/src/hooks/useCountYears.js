export const useCountYears = (insights) => {
  const count = {};

  const countYears = insights.sortedByYear.forEach((book) => {
    count[book.firstPublishYear] = (count[book.firstPublishYear] || 0) + 1;  
   })

  const countKeys = Object.keys(count);

  const data = countKeys.map((key) => {
   return {
     "name": key,
     "Books": count[key],
    }
  })

  const countDecades = {};

  const countDecadesFunc = insights.sortedByYear.forEach((book) => {
    countDecades[book.firstPublishYear.substring(0, 2)] = (countDecades[book.firstPublishYear.substring(0, 2)] || 0) + 1;  
   })

  const countDecadesKeys = Object.keys(countDecades);

  const dataForDecades = countDecadesKeys.map((key) => {
   return {
     "name": key + "00's",
     "Books": countDecades[key],
    }
  })

  return {
    countYears, countKeys, data, countDecadesFunc, countDecadesKeys, dataForDecades
  }
}