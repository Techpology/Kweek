import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import Logo from "../Images/Logo"

import InputField from '../Components/InputField'
import TextButton from '../Components/TextButton'
import Btn from '../Components/Btn'

export default function Signin(props) {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const signIn = () =>
	{
		axios.post("customer/signin/",{
			"email": email,
			"password": password
		}).then(resp=>{
			console.log(resp.data);
			props.updateSession()
			props.navigation.popToTop();
			props.navigation.replace("Home")
		}).catch(err=>{
			alert(err.message);
		})
	}

	return (
		<View style={[{backgroundColor: "#F8F8F8"}, t.wFull, t.hFull]}>
			<View style={[t.hFull, t.wFull, t.flex, t.flexCol, t.itemsCenter, t.justifyCenter]}>
				<Logo width={200} height={200} />
				<InputField title="Email" placeholder="e-mail" val={(e)=>{setEmail(e)}} style={[t.mB8]} />
				<InputField type={"default"} secure={true} title="Password" placeholder="password" val={(e)=>{setPassword(e)}} />
				{/* <TextButton inner="Forgot password?" trigger={()=>{}} style={[{marginTop: 10}, t.selfEnd, t.mR16]} /> */}
				<Btn inner="Sign in" style={[t.mT12]} trigger={()=>{signIn()}} />
				<TextButton inner="Create an account?" trigger={()=>{props.navigation.navigate("Signup")}} style={[{marginTop: 4}, t.mT4, t.textCenter]} />
			</View>
		</View>
	)
}