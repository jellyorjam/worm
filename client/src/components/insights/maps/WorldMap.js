import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";


const WorldMap = ({ setTooltipContent, content }) => {

 const countriesRead = ["United States"];

const renderStyle = (geo) => {
  if (countriesRead.includes(geo.properties.name)) {
    return {
      default: {
        fill: "#0097A7",
        outline: "none",
        stroke: "#000000"
      },
      hover: {
        fill: "#F53",
        outline: "none"
      },
      pressed: {
        fill: "#E42",
        outline: "none"
      }
    }
  }
  else {
    return {
      default: {
        fill: "#D6D6DA",
        outline: "none",
        stroke: "#000000"
      },
      hover: {
        fill: "#F53",
        outline: "none"
      },
      pressed: {
        fill: "#E42",
        outline: "#none"
      }
    }
  }
}

  return (
    <div data-tip="">
      <ComposableMap  projectionConfig={{scale: 120}} width={800} height={400}
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
                    console.log(content)
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
  );
};

export default memo(WorldMap);