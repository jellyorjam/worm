import { Typography } from "@mui/material"

export const renderCategories = (categories) => {
      if (categories) {
        return categories.map((category, i) => {
          return (
            <Typography key={i}>{category}</Typography>
          )
        })
      }
      else {
        return (
          <div></div>
        )
      }
}