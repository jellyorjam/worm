import { Typography } from "@mui/material"

export function renderAuthors (authors, heading) {
  if (!authors) {
    return (
      <div></div>
    )
  }

  if (authors.length === 1) {
    return (
      <div>
        <Typography variant={heading}>{authors[0]}</Typography>
      </div>
      
    )
  }

  if (authors.length > 1 && authors.length <= 5) {
    return authors.map((author, i) => {
      return (
        <div key={i}>
          <Typography  variant={heading}>{author}</Typography>
        </div>
        
      )
    })
  }

  if (authors.length > 5) {
    let limitedAuthors = []
    for (let i = 0; i < 5; i++) {
      let author = authors[i];
      limitedAuthors.push(author)
    }
    
    return limitedAuthors.map((author, i) => {
      if (i === 4) {
        return (
          <div key={i}>
            <Typography  variant={heading}>{author} ... and more</Typography>
          </div>
          
        )
      }
      else {
        return (
          <div key={i}>
          <Typography  variant={heading}>{author}</Typography>
          </div>
          
        )
      }
    })
  }
}

