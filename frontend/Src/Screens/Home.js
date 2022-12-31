import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import { MaterialIcons } from '@expo/vector-icons'; 

import WideImgBtn from '../Components/WideImgBtn'
import Search from "../Components/Search"
import PostCard from '../Components/PostCard';

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
		GetSession();
		getStores();
		getFaveStores();
		getPosts();
	},[])

	const [faveStores, setFaveStores] = useState([])
	const getFaveStores = () =>
	{
		axios.get("customer/get/fave")
		.then(resp=>{
			console.log(resp.data);
			setFaveStores(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const [posts, setPosts] = useState([])
	const getPosts = () =>
	{
		axios.get("/customer/get/posts")
		.then(resp=>{
			console.log(resp.data)
			setPosts(resp.data)
		}).catch(err=>{
			alert(err.message)
		})
	}

	const PostItem = ({i}) =>{
		return(
			<PostCard title={i["title"]} desc={i["desc"]} image={axios.defaults.baseURL + i["img"]} />
		)
	}

	const renderPostItem = ({item}) =>
	{
		return(
			<PostItem i={item} />
		)
	}

	const [activeScreen, setActiveScreen] = useState(2)

	const flow = () =>{
		if(activeScreen == 0)
		{
			return(
				<FlatList data={posts} renderItem={renderPostItem} keyExtractor={item=>item.id} />
			)
			return(
				<View style={[t.flex, t.flexCol, t.wFull, t.itemsCenter, t.justifyCenter, t.pT8]}>
					<Text style={[t.textLg]}>This page is still under development</Text>
					<MaterialIcons name="engineering" size={24} color="black" />
				</View>
			)
		}else if(activeScreen == 1)
		{
			const retFave = faveStores.map((i, key) =>
				<WideImgBtn key={key} img={axios.defaults.baseURL + i["pfp"]} inner={i["name"] +"\n" + i["Address"]} trigger={()=>{props.navigation.navigate("StorePage", {id: i["id"]})}} />
			)

			return(
				<View style={[t.wFull, t.hFull]}>
					<Text style={[t.textXl, t.mL4, t.mT2, t.mB4]}>Liked stores</Text>
					<ScrollView style={[t.wFull, t.hFull, t.pX5]}>
						{retFave}
					</ScrollView>
				</View>
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
		navTrigger={()=>{setActiveScreen(0)}} favTrigger={()=>{setActiveScreen(1); getFaveStores()}} searchTrigger={()=>{setActiveScreen(2)}} 
		cartPress={()=>{props.navigation.navigate("Cart")}} session={(props.session["name"] != undefined) ? props.session : ""}>
			{flow()}
		</Master>
	)
}