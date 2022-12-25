import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'

import WideImgBtn from '../Components/WideImgBtn'
import Search from "../Components/Search"

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

	const [stores, setStores] = useState([])
	const getStores = () =>
	{
		axios.get("customer/get/stores/at/location")
		.then(resp=>{
			console.log(resp.data);
			setStores(resp.data);
		}).catch(err=>{
			console.log(err.message);
		})
	}

	useEffect(()=>{
		GetSession()
		getStores()
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
			console.log(stores)
			const ret = stores.map((i, key) =>
				<WideImgBtn key={key} img={axios.defaults.baseURL + i["pfp"]} inner={i["name"] +"\n" + i["Address"]} trigger={()=>{props.navigation.navigate("StorePage", {id: i["id"]})}} />
			)
			return(
				<View style={[t.wFull, t.hFull]}>
					<Search placeholder="Search" title="Where would you like to shop?" style={[t.mT4]} />
					<ScrollView style={[t.wFull, t.hFull, t.pX5]}>
						{ret}
					</ScrollView>
				</View>
			)
		}
	}

	return (
		<Master searchIC={(activeScreen == 2) ? true : false} compassIC={(activeScreen == 0) ? true : false} starIC={(activeScreen == 1) ? true : false} top={true} sqTrigger={()=>{props.navigation.navigate("Account")}} 
		navTrigger={()=>{setActiveScreen(0)}} favTrigger={()=>{setActiveScreen(1)}} searchTrigger={()=>{setActiveScreen(2)}} cartPress={()=>{props.navigation.navigate("Cart")}}>
			{flow()}
		</Master>
	)
}