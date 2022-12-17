import { View, Text } from 'react-native'
import React from 'react'
import { t } from "react-native-tailwindcss"
import Logo from "../Images/Logo"

export default function Login() {
  return (
	<View style={[{backgroundColor: "#F8F8F8"}, t.wFull, t.hFull]}>
		<View style={[t.hFull, t.wFull, t.flex, t.flexCol]}>
			<Logo />
		</View>
	</View>
  )
}