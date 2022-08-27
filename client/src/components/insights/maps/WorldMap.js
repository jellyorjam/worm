import React, { memo, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { allCountries } from "../../../data/geoLists";
import GeoInfo from "./GeoInfo";




const WorldMap = ({ setTooltipContent, content, dashboard }) => {
  const books = useSelector(state => state.books);

  const [isClicked, setIsClicked] = useState(false);
  const [countryClicked, setCountryClicked] = useState("");


  const countriesRead = [];

  books.forEach((book) => {
    if (book.SubjectPlace) {
      book.SubjectPlace.forEach((subject) => {
        allCountries.forEach((country) => {
          if (country === subject) {
            countriesRead.push(subject)
          }
        })
      })
    }
  })


const renderStyle = (geo) => {
  if (countriesRead.includes(geo.properties.name)) {
    return {
      default: {
        fill: "#689f38",
        outline: "none",
        stroke: "#000000"
      },
      hover: {
        fill: "#e6ee9c",
        outline: "none"
      },
      pressed: {
        fill: "#6b9b37",
        outline: "none"
      }
    }
  }
  else {
    return {
      default: {
        fill: "#e0e0e0",
        outline: "none",
        stroke: "#000000"
      },
      hover: {
        fill: "#e6ee9c",
        outline: "none"
      },
      pressed: {
        fill: "#6b9b37",
        outline: "#none"
      }
    }
  }
}
const booksFromCountry = []


  books.forEach((book) => {
   if (book.SubjectPlace) {
     book.SubjectPlace.forEach((subject) => {
       if (subject.includes(countryClicked)) {
         booksFromCountry.push(book)
       }
     })
   }
   })

const renderCountryInfoDiv = () => {
  if (isClicked) {
    return (
      <div><GeoInfo state={countryClicked} booksFromState={booksFromCountry}/></div>
    )
  }
}

  return (
    <Box paddingRight={dashboard ? "0px": "50px"} paddingTop={dashboard ? "0px": "25px"}>
    <div data-tip="">
      <ComposableMap  projectionConfig={dashboard ? {scale: 170} : {scale: 140}} width={800} height={dashboard ? 500 : 400}
  style={{ width: "100%", height: "auto" }} >
          <Geographies geography="/features.json">
            {({ geographies }) =>
           
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(`${geo.properties.name}`);
                  }}
                  onClick={() => {
                    setTooltipContent(`${geo.properties.name}`);
                    setIsClicked(true);
                    setCountryClicked(content)

                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={renderStyle(geo)}
                />
              ))
            }
          </Geographies>
      </ComposableMap>
    </div>
    {renderCountryInfoDiv()}
    </Box>
  );
};

export default memo(WorldMap);