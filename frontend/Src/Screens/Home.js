import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import { MaterialIcons } from '@expo/vector-icons'; 

import WideImgBtn from '../Components/WideImgBtn'
import Search from "../Components/Search"
import PostCard from '../Components/PostCard';

import Master from './Master'
import LoadingCard from '../Components/LoadingCard';


/* return(
	<View style={[t.flex, t.flexCol, t.wFull, t.itemsCenter, t.justifyCenter, t.pT8]}>
		<Text style={[t.textLg]}>This page is still under development</Text>
		<MaterialIcons name="engineering" size={24} color="black" />
	</View>
) */

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
	const [storeType, setStoreType] = useState("#")
	const getStores = () =>
	{
		axios.post("customer/get/stores/at/location", {type: storeType})
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
		console.log(i)
		return(
			<PostCard title={i["title"]} desc={i["desc"]} base={axios.defaults.baseURL} images={JSON.parse(i["img"].replace(/'/g,'"'))} likes={i["likes"]} liked={i["isLiked"]} 
			date={i["created"].split(" ")[0]} id={i["id"]} pfp={i["pfp"]} storeName={i["store_name"]} trigger={()=>{props.navigation.navigate("StorePage", {id: i["store_id"]})}} />
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
				<View style={[t.wFull, t.hFull, t.pB48]}>
					<FlatList data={posts} renderItem={renderPostItem} keyExtractor={item=>item.id} />
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
			{/* <WideImgBtn key={key} img={axios.defaults.baseURL + i["pfp"]} inner={i["name"] +"\n" + i["Address"]} trigger={()=>{props.navigation.navigate("StorePage", {id: i["id"]})}} /> */}
			const ret = stores.map((i, key) =>
				<TouchableOpacity style={[t.pX2, t.pY2, t.flex, t.flexCol, t.itemsCenter, t.justifyCenter, t.bgWhite, {height: 100, width: 100}, t.roundedLg, t.mY2, t.mX2, 
				{
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowOffset: {width: 0, height: 2},
					shadowRadius: 8,
					elevation: 4
				}]} onPress={()=>{props.navigation.navigate("StorePage", {id: i["id"]})}} key={key}>
					<Image source={{uri: axios.defaults.baseURL + i["pfp"]}} style={[{height: 80, width: 80}, t.roundedFull]} />
					<Text>{i["name"]}</Text>
				</TouchableOpacity>
			)
			return(
				<View style={[t.wFull, t.hFull]}>
					<Search val={(e)=>{}} placeholder="Search" title="Where would you like to shop?" style={[t.mT4]} />
					<ScrollView style={[t.wFull, t.hFull, t.pX5]}>
						<View style={[t.flex, t.flexRow, t.flexWrap]}>
							{ret}
						</View>
					</ScrollView>
				</View>
			)
		}
	}

	return (
		<Master searchIC={(activeScreen == 2) ? true : false} compassIC={(activeScreen == 0) ? true : false} starIC={(activeScreen == 1) ? true : false} top={true} sqTrigger={()=>{props.navigation.navigate("Account")}} 
		navTrigger={()=>{setActiveScreen(0); getPosts()}} favTrigger={()=>{setActiveScreen(1); getFaveStores()}} searchTrigger={()=>{setActiveScreen(2)}} 
		cartPress={()=>{props.navigation.navigate("Cart")}} session={(props.session["name"] != undefined) ? props.session : ""}>
			{flow()}
		</Master>
	)
}