import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={393}
    height={440}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M172.5 190C209 138.5 340 59.5 405.5 4v-25L-4-11.5V440c177-21 113.644-161.312 176.5-250Z"
      fill="#323232"
    />
    <Path
      d="M99.862 219C140.163 172.69 256.866 75.667 297 4v-25L-4-11.5V440c9.041-73.667 32.5-139 103.862-221Z"
      fill="#3E3E3E"
    />
  </Svg>
)

export default SvgComponent
