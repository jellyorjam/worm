import { Typography } from "@mui/material"

export function renderAuthors (authors, heading) {
  if (!authors) {
    return (
      <div></div>
    )
  }

  if (authors.length === 1) {
    return (
      <Typography variant={heading}>{authors[0]}</Typography>
    )
  }

  if (authors.length > 1) {
    return authors.map((author, i) => {
      return (
        <Typography key={i} variant={heading}>{author}</Typography>
      )
    })
  }
}

