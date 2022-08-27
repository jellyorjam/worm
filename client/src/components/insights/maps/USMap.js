import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { allStates } from "../../../data/geoLists";
import GeoInfo from "./GeoInfo";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


const USMap = ({setTooltipContent, content}) => {

  const [isClicked, setIsClicked] = useState(false);
  const [stateClicked, setStateClicked] = useState("");

  const books = useSelector(state => state.books)
  
  const statesRead = [];

  books.forEach((book) => {
    if (book.SubjectPlace) {
      book.SubjectPlace.forEach((subject) => {
        allStates.forEach((state) => {
          if (state === subject) {
            statesRead.push(subject)
          }
        })
      })
    }
  })

  const renderStyle = (geo) => {
    if (statesRead.includes(geo.properties.name)) {
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

  const booksFromState = []


  books.forEach((book) => {
   if (book.SubjectPlace) {
     book.SubjectPlace.forEach((subject) => {
       if (subject.includes(stateClicked)) {
         booksFromState.push(book)
       }
     })
   }
   })



  const renderUSInfoDiv = () => {
    if (isClicked) {
      return (
        <div><GeoInfo state={stateClicked} booksFromState={booksFromState}/></div>
      )
    }
  }

  return (
    <div data-tip="">
    <ComposableMap projection="geoAlbersUsa" projectionConfig={{scale: 850}} width={800} height={400}
  style={{ width: "100%", height: "auto" }} >
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                onMouseEnter={() => {
                  setTooltipContent(`${geo.properties.name}`);
                }}
                onClick={() => {
                  setTooltipContent(`${geo.properties.name}`);
                  setIsClicked(true);
                  setStateClicked(content)

                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={renderStyle(geo)}
              />
            ))}
          </>
        )}
      </Geographies>
    </ComposableMap>
    {renderUSInfoDiv()}
    </div>
  );
};

export default memo(USMap);