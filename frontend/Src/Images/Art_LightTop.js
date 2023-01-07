import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={410}
    height={461}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M176.5 211C213 159.5 344 80.5 409.5 25V0H0v461c177-21 113.644-161.312 176.5-250Z"
      fill="#E7E7E7"
    />
    <Path
      d="M103.862 240C144.163 193.69 258.367 97.167 298.5 25.5l13-25.5H0v461c9.041-73.667 32.5-139 103.862-221Z"
      fill="#fff"
    />
  </Svg>
)

export default SvgComponent
