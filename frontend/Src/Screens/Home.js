import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'

import WideImgBtn from '../Components/WideImgBtn'

import Master from './Master'

export default function Home(props) {
	const [session, setSession] = useState({})
	const GetSession = () => {
		axios.get("customer/get/session")
		.then(resp=>{
			console.log(session)
			setSession(resp.data)
		}).catch(err=>{
			alert(err.message)
		})
	}

	useEffect(()=>{
		GetSession()
	},[])

	const [activeScreen, setActiveScreen] = useState(0)

	const flow = () =>{
		if(activeScreen == 0)
		{
			return(
				<View style={[t.pX8, {height: "75%"}]}>
					<ScrollView>
						<WideImgBtn img={"https://punjabgrossen.se/storage/90056518-xl1-20210120-540x600.jpg"} inner={"Can"}/>
					</ScrollView>
				</View>
			)
		}else if(activeScreen == 1)
		{
			return(
				<Text style={[t.text4xl]}>1</Text>
			)
		}else if(activeScreen == 2)
		{
			return(
				<Text style={[t.text4xl]}>2</Text>
			)
		}
	}

	return (
		<Master searchIC={(activeScreen == 2) ? true : false} compassIC={(activeScreen == 0) ? true : false} starIC={(activeScreen == 1) ? true : false} top={true} sqTrigger={()=>{props.navigation.navigate("Account")}} 
		navTrigger={()=>{setActiveScreen(0)}} favTrigger={()=>{setActiveScreen(1)}} searchTrigger={()=>{setActiveScreen(2)}}>
			{flow()}
		</Master>
	)
}