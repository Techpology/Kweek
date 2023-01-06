import * as React from "react"
import Svg, {
  G,
  Path,
  Mask,
  Circle,
  Ellipse,
  Defs,
  ClipPath,
} from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={1259}
    height={852}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M0 0h1259v852H0z" />
      <Path fill="#323232" d="M612 601h655v251H612z" />
      <Path
        d="M497.5 307C493.542 182.709 574.453 52.085 616.679.6c.537-.655.037-1.6-.81-1.6H-11a1 1 0 0 0-1 1v855a1 1 0 0 0 1 1h628c.552 0 1-.41 1.002-.963.165-39.926 10.528-145.648 50.998-257.537C720 456.5 502.5 464 497.5 307Z"
        fill="#A9A9A9"
      />
      <Mask
        id="b"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={-12}
        y={-1}
        width={689}
        height={857}
      >
        <Path
          d="M497.5 307C493.542 182.709 574.453 52.085 616.679.6c.537-.655.037-1.6-.81-1.6H-11a1 1 0 0 0-1 1v855a1 1 0 0 0 1 1h628c.552 0 1-.41 1.002-.963.165-39.926 10.528-145.648 50.998-257.537C720 456.5 502.5 464 497.5 307Z"
          fill="#A9A9A9"
        />
      </Mask>
      <G mask="url(#b)">
        <Path fill="#4C4C4C" d="M369 601h316v251H369z" />
      </G>
      <Path
        d="M256 307C252.042 182.709 332.953 52.085 375.179.6c.537-.655.037-1.6-.81-1.6H-11a1 1 0 0 0-1 1v855a1 1 0 0 0 1 1h386.5c.552 0 1-.41 1.002-.963.165-39.926 10.528-145.648 50.998-257.537C478.5 456.5 261 464 256 307Z"
        fill="#4D4D4D"
      />
      <Mask
        id="c"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={-12}
        y={-1}
        width={448}
        height={857}
      >
        <Path
          d="M256 307C252.042 182.709 332.953 52.085 375.179.6c.537-.655.037-1.6-.81-1.6H-11a1 1 0 0 0-1 1v855a1 1 0 0 0 1 1h386.5c.552 0 1-.41 1.002-.963.165-39.926 10.528-145.648 50.998-257.537C478.5 456.5 261 464 256 307Z"
          fill="#4D4D4D"
        />
      </Mask>
      <G mask="url(#c)">
        <Path fill="#A9A9A9" d="M188 601h247v251H188z" />
      </G>
      <Path
        d="M92.5 307C88.542 182.709 169.453 52.085 211.679.6c.537-.655.037-1.6-.81-1.6H-11a1 1 0 0 0-1 1v855a1 1 0 0 0 1 1h223c.552 0 1-.41 1.002-.963.165-39.926 10.528-145.648 50.998-257.537C315 456.5 97.5 464 92.5 307Z"
        fill="#323232"
      />
      <Mask
        id="d"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={-12}
        y={-1}
        width={284}
        height={857}
      >
        <Path
          d="M92.5 307C88.542 182.709 169.453 52.085 211.679.6c.537-.655.037-1.6-.81-1.6H-11a1 1 0 0 0-1 1v855a1 1 0 0 0 1 1h223c.552 0 1-.41 1.002-.963.165-39.926 10.528-145.648 50.998-257.537C315 456.5 97.5 464 92.5 307Z"
          fill="#323232"
        />
      </Mask>
      <G mask="url(#d)">
        <Path fill="#fff" d="M0 601h272v251H0z" />
      </G>
      <Path
        d="M36.824 282.38c.117-.961 1.396-1.211 1.867-.364l2.784 5.015a1 1 0 0 0 1.066.496l5.63-1.098c.951-.186 1.584.954.924 1.663l-3.91 4.198a1 1 0 0 0-.142 1.167l2.785 5.015c.47.847-.419 1.801-1.297 1.392l-5.2-2.421a1 1 0 0 0-1.154.225l-3.91 4.199c-.66.708-1.841.158-1.724-.803l.695-5.694a1 1 0 0 0-.57-1.028l-5.201-2.421c-.878-.409-.72-1.702.23-1.888l5.63-1.098a1 1 0 0 0 .802-.861l.695-5.694ZM202.218 492.092c.462-.852 1.744-.615 1.871.345l.751 5.687c.057.43.384.774.81.853l5.641 1.042c.953.176 1.123 1.468.249 1.886l-5.176 2.472a1 1 0 0 0-.56 1.034l.751 5.687c.127.96-1.049 1.522-1.716.819l-3.951-4.159a1 1 0 0 0-1.156-.213l-5.176 2.472c-.874.418-1.772-.527-1.31-1.379l2.734-5.043a.998.998 0 0 0-.154-1.165l-3.951-4.159c-.667-.703-.046-1.848.907-1.672l5.641 1.042a1 1 0 0 0 1.061-.507l2.734-5.042Z"
        fill="#D9D9D9"
      />
      <Path
        d="M57 86c22.667-3 66.1-4 58.5 16C106 127 15 166.5 8 160"
        stroke="#fff"
      />
      <Path d="m99 596 4 5h16.5l3.5-9.5-20-4.5-4 9Z" fill="#888" />
      <Path
        d="m79 597.5 4 5h16.5l3.5-9.5-20-4.5-4 9ZM118 598l4 5h16.5l3.5-9.5-20-4.5-4 9Z"
        fill="#A8A8A8"
      />
      <Path d="m87 605 4 5h16.5l3.5-9.5-20-4.5-4 9Z" fill="#C9C8C8" />
      <Path d="m106 605 4 5h16.5l3.5-9.5-20-4.5-4 9Z" fill="#C9C8C8" />
      <Path d="m332 605 4 5h16.5l3.5-9.5-20-4.5-4 9Z" fill="#DFDFDF" />
      <Path
        d="m605 633 4-5h16.5l3.5 9.5-20 4.5-4-9ZM473 619l-4-5h-16.5l-3.5 9.5 20 4.5 4-9Z"
        fill="#fff"
      />
      <Path d="m303 663-4 5h-16.5l-3.5-9.5 20-4.5 4 9Z" fill="#DFDFDF" />
      <Path
        d="M100 595c-2.833-1-8.6-3.8-9-7-.5-4-.5-16 3-17m28.5 24c1.667-.667 4.8-3 4-7-1-5-4-10.5-4-15 0-3.6 4.333-7.833 6.5-9.5M114 591c-1.167-3.833-2.8-12.8 0-18 2.8-5.2 4.5-12.167 5-15m-13.5 27c.167-3 .1-9.8-1.5-13-1.6-3.2-5.667-12.333-7.5-16.5"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={53.5} cy={536.5} r={13.5} fill="#C9C8C8" />
      <Ellipse cx={53.5} cy={572} rx={13.5} ry={24} fill="#C9C8C8" />
      <Ellipse cx={59.5} cy={598} rx={19.5} ry={11} fill="#C9C8C8" />
      <Path
        d="M344 283.944c4.5-7.05 15.5-19.035 23.5-10.575M391 284.21c-4.5-7.05-17.5-24.251-23.5-9.251M438 368.046c2.777-4.35 9.564-11.745 14.5-6.525M467 368.21c-2.777-4.35-10.798-14.963-14.5-5.708M511 84.221c2.777-4.35 9.564-11.745 14.5-6.525M540 84.385c-2.777-4.35-10.798-14.964-14.5-5.708"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M770 195.221c2.777-4.35 9.564-11.745 14.5-6.525M799 195.385c-2.777-4.35-10.798-14.963-14.5-5.708M1010 363.221c2.78-4.35 9.56-11.745 14.5-6.525M1039 363.385c-2.78-4.35-10.8-14.963-14.5-5.708M1128 75.221c2.78-4.35 9.56-11.745 14.5-6.525M1157 75.385c-2.78-4.35-10.8-14.964-14.5-5.708"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M957.5 602c-43 13.167-138.7 49.5-177.5 89.5-38.8 40-75.833 124-89.5 161M1059 602c-43 13.167-138.7 49.5-177.5 89.5-38.8 40-75.833 124-89.5 161"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1010 602c-43 13.167-138.7 49.5-177.5 89.5-38.8 40-75.833 124-89.5 161"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="17 17"
      />
      <Path fill="#CECECE" d="M1103 270h156v351h-156z" />
      <Path
        fill="#5F5F5F"
        d="M1119 292h32v39h-32zM1165 292h32v39h-32zM1211 292h32v39h-32zM1119 348h32v39h-32zM1165 348h32v39h-32zM1211 348h32v39h-32zM1119 404h32v39h-32zM1165 404h32v39h-32zM1211 404h32v39h-32zM1119 460h32v39h-32zM1165 460h32v39h-32zM1211 460h32v39h-32zM1119 516h32v39h-32zM1165 516h32v39h-32zM1211 516h32v39h-32z"
      />
      <Path fill="#BABABA" d="M1039 312h156v351h-156z" />
      <Path
        fill="#5F5F5F"
        d="M1055 334h32v39h-32zM1101 334h32v39h-32zM1147 334h32v39h-32zM1055 390h32v39h-32zM1101 390h32v39h-32zM1147 390h32v39h-32zM1055 446h32v39h-32zM1101 446h32v39h-32zM1147 446h32v39h-32zM1055 502h32v39h-32zM1101 502h32v39h-32zM1147 502h32v39h-32zM1055 558h32v39h-32zM1101 558h32v39h-32zM1147 558h32v39h-32z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h1259v852H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent