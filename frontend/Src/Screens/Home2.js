import { View, Text, ScrollView, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import * as Animatable from "react-native-animatable";
import { useFonts } from 'expo-font';
import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import Art_LightTop from "../Images/Art_LightTop"

import Search from '../Components/Search';
import WideBtn from "../Components/WideBtn";
import WideImgBtn from "../Components/WideImgBtn";
import PostCard from '../Components/PostCard';

export default function Home2(props) {
	const [_h, set_h] = useState(Dimensions.get("window").height);
	const [_w, set_w] = useState(Dimensions.get("window").width);

	useEffect(()=>{
		getAppCategories()
		getFeaturedStores()
		getFeaturedPosts()
		getFaveStores()
		getPosts()
	},[])

	const [categ, setCateg] = useState([])
	const getAppCategories = () =>
	{
		axios.get("utils/featured/categories")
		.then(resp=>{
			console.log(resp.data);
			setCateg(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const [featuredStores, setFeaturedStores] = useState([])
	const getFeaturedStores = () =>
	{
		axios.get("utils/featured/stores")
		.then(resp=>{
			console.log(resp.data);
			setFeaturedStores(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const [featuredPosts, setFeaturedPosts] = useState([])
	const getFeaturedPosts = () =>
	{
		axios.get("utils/featured/posts")
		.then(resp=>{
			console.log(resp.data);
			setFeaturedPosts(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const RectBtnLg = (props) =>
	{
		return(
			<Animatable.View animation="fadeInRight" duration={1500} delay={1000}>
				<TouchableOpacity style={[{height: 130, width: 130, marginHorizontal: 5, borderRadius: 10}, t.bgWhite, t.itemsCenter, t.justifyCenter, t.mY2, 
				{
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffset: {width: 0, height: 0},
					shadowRadius: 8,
					elevation: 4,
				}]} onPress={()=>{}}>
					<Image style={[t.hFull, t.wFull, {borderRadius: 10}]} source={{uri: props.bg}} />
					<Image style={[{height: 80, width: 80}, t.absolute, t.roundedFull, t.bgWhite]} 
					source={{uri: props.front}} />
				</TouchableOpacity>
			</Animatable.View>
		)
	}

	const RectPillBtn = (props) =>
	{
		return(
			<Animatable.View animation="fadeInRight" duration={1000} delay={1800}>
				<TouchableOpacity style={[{height: 35, marginHorizontal: 5}, t.mY2, t.pX6, t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter, 
				{
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffset: {width: 0, height: 0},
					shadowRadius: 8,
					elevation: 4,
				}, t.flex, t.flexRow]} onPress={()=>{}}>
					{props.icon}
					<Text style={[{marginLeft: 4}]}>{props.inner}</Text>
				</TouchableOpacity>
			</Animatable.View>
		)
	}

	const RectBtnMd = () =>
	{
		return(
			<Animatable.View animation="fadeInRight" duration={1500} delay={2000}>
				<TouchableOpacity style={[{height: 100, width: 210, marginHorizontal: 5, marginVertical: 10, borderRadius: 10}, t.bgWhite, t.flex, t.flexRow, 
				{
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffset: {width: 0, height: 0},
					shadowRadius: 8,
					elevation: 4,
				},
				t.itemsCenter, t.pX2,]} onPress={()=>{}}>
					<View style={[{height: 80, width: 80}, t.roundedLg, t.bgGray600]} />
					<View style={[t.hFull, t.itemsCenter, t.pY4, t.flex, t.flexCol]}>
						<Text style={[{fontFamily: "Kodchasan_light", fontSize: 14}]}>Title</Text>
						<View style={[t.pL3]}>
							<Text style={[{fontFamily: "Kodchasan_light", color: "#00000080", fontSize: 12}]}>Desc</Text>
						</View>
					</View>
				</TouchableOpacity>
			</Animatable.View>
		)
	}

	const signOut = () =>
	{
		axios.get("customer/signout")
		.then(resp=>{
			props.updateSession()
			props.navigation.popToTop();
			props.navigation.replace("Signin")
		}).catch(err=>{
			console.log(err.message)
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

	const [pageIndex, setPageIndex] = useState(0)
	const flow = () =>
	{
		if(pageIndex == 0)
		{
			return(
				<ScrollView style={[{paddingBottom: 90}]}>
					<Animatable.Text style={[{fontFamily: "Kodchasan_semiBold", fontSize: 24, marginTop: 40, marginLeft: 20}]} animation="fadeInLeft">
						Where would you like{"\n"}to shop today
					</Animatable.Text>
					
					<Animatable.View animation="fadeInUp" duration={1500}>
						<Search placeholder="Search"/>
						<TouchableOpacity><Text style={[{fontFamily: "Kodchasan_light", fontSize: 14}, t.selfEnd, t.mR10]}>Change city</Text></TouchableOpacity>
					</Animatable.View>
					
					<Animatable.View animation="fadeInUp" duration={1500}>
						<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 20, marginLeft: 20}]}>Featured stores</Text>
						<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5}]} horizontal={true} showsHorizontalScrollIndicator={false} >
							<RectBtnLg bg="https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg"
								front="https://t4.ftcdn.net/jpg/03/31/93/85/360_F_331938599_nmkc39B7E74s1G5P01b0YCJ6x0MNMqJz.jpg" />

							<RectBtnLg bg="https://vernsglass.com/wp-content/uploads/2019/09/Commercial-Storefronts.jpg"
								front="https://images-platform.99static.com//6m2oEkLGOcAM-NspjIsGTF_x0do=/992x996:1866x1870/fit-in/500x500/projects-files/81/8156/815645/5513ffc1-e979-45e3-9684-6b725aa4df71.jpg" />

							<RectBtnLg bg="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmVmcm9udHxlbnwwfHwwfHw%3D&w=1000&q=80"
								front="https://www.logodesign.net/logo-new/basket-with-grocery-store-items-9065ld.png?industry=grocery-shop" />

							<RectBtnLg bg="https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg"
								front="https://t4.ftcdn.net/jpg/03/31/93/85/360_F_331938599_nmkc39B7E74s1G5P01b0YCJ6x0MNMqJz.jpg" />
						</ScrollView>
					</Animatable.View>

					<Animatable.View animation="fadeInRight" duration={1500}>
						<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 30, marginLeft: 20}]}>Categories</Text>
						<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5}]} horizontal={true} showsHorizontalScrollIndicator={false} >
							<RectPillBtn inner="All" />
							<RectPillBtn inner="Groceries" icon={(<MaterialIcons name="storefront" size={18} color="black" />)}/>
							<RectPillBtn inner="Restaurants" icon={(<Ionicons name="restaurant-outline" size={18} color="black" />)}/>
							<RectPillBtn inner="Electronics" icon={(<Ionicons name="phone-portrait-outline" size={18} color="black" />)} />
						</ScrollView>
					</Animatable.View>

					<Animatable.View animation="fadeInRight" duration={1500}>
						<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 20, marginLeft: 20}]}>Featured posts</Text>
						<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5, marginTop: 10}]} horizontal={true} showsHorizontalScrollIndicator={false} >
							<RectBtnMd /><RectBtnMd /><RectBtnMd /><RectBtnMd />
						</ScrollView>
					</Animatable.View>

					<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 20, marginLeft: 20}]}>Featured stores</Text>
					<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5}]} horizontal={true} showsHorizontalScrollIndicator={false} >
						<RectBtnLg bg="https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg"
							front="https://t4.ftcdn.net/jpg/03/31/93/85/360_F_331938599_nmkc39B7E74s1G5P01b0YCJ6x0MNMqJz.jpg" />

						<RectBtnLg bg="https://vernsglass.com/wp-content/uploads/2019/09/Commercial-Storefronts.jpg"
							front="https://images-platform.99static.com//6m2oEkLGOcAM-NspjIsGTF_x0do=/992x996:1866x1870/fit-in/500x500/projects-files/81/8156/815645/5513ffc1-e979-45e3-9684-6b725aa4df71.jpg" />

						<RectBtnLg bg="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmVmcm9udHxlbnwwfHwwfHw%3D&w=1000&q=80"
							front="https://www.logodesign.net/logo-new/basket-with-grocery-store-items-9065ld.png?industry=grocery-shop" />

						<RectBtnLg bg="https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg"
							front="https://t4.ftcdn.net/jpg/03/31/93/85/360_F_331938599_nmkc39B7E74s1G5P01b0YCJ6x0MNMqJz.jpg" />
					</ScrollView>

					<View style={[{height: 90}, t.itemsCenter, t.justifyCenter]} />
				</ScrollView>
			)
		}
		if(pageIndex == 1)
		{
			return(
				<View style={[t.wFull, t.hFull, t.pB48, t.mT8]}>
					<FlatList data={posts} renderItem={renderPostItem} keyExtractor={item=>item.id} />
				</View>
			)
		}
		if(pageIndex == 2)
		{
			const retFave = faveStores.map((i, key) =>
				<WideImgBtn key={key} img={axios.defaults.baseURL + i["pfp"]} inner={i["name"] +"\n" + i["Address"]} trigger={()=>{props.navigation.navigate("StorePage", {id: i["id"]})}} />
			)

			return(
				<View style={[t.wFull, t.hFull]}>
					<Text style={[t.textXl, t.mL4, t.mT8, t.mB4]}>Liked stores</Text>
					<ScrollView style={[t.wFull, t.hFull, t.pX5]}>
						{retFave}
					</ScrollView>
				</View>
			)
		}
		if(pageIndex == 3)
		{
			return(
				<ScrollView style={[{paddingBottom: 90}]}>
					<Animatable.View animation="fadeInDown">
						<Art_LightTop style={[t.absolute, t.top0, t.z0]} />
					</Animatable.View>
					
					<View style={[{height: _h, width: _w}, t.z10]}>
						<Animatable.View animation="fadeInLeft" delay={300}>
							<View style={[t.wFull, t.flex, t.flexRow, t.flexWrap]}>
								<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 24}, t.textWhite, t.mL4, t.mT4]}>Profile</Text>
							</View>
						</Animatable.View>

						<View style={[t.wFull, t.flex, t.flexRow, t.flexWrap, t.mT10, t.pX2, t.itemsCenter, t.justifyEvenly]}>
							<Animatable.View animation="fadeInRight" style={[t.w1_2, t.pL3, t.flex, t.flexCol, t.flexWrap]}>
								<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 24}, t.textWhite]}>Subscribers</Text>
								<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 24}, t.textWhite]}>{props.session["store_faves"]}</Text>
							</Animatable.View>
							<Animatable.View animation="fadeInLeft" style={[t.flex, t.flexCol, t.itemsCenter, t.justifyCenter]}>
								<Image source={{uri: axios.defaults.baseURL + props.session["store_pfp"]}} 
								style={[{width: 120, height: 120}, t.roundedFull, {
									shadowColor: 'rgba(0, 0, 0, 1)',
									shadowOffset: {width: 0, height: 2},
									shadowRadius: 8,
									elevation: 4,
								}]} />
								<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 18}, t.textBlack]}>{props.session["store_name"]}</Text>
							</Animatable.View>
						</View>

						<View style={[t.wFull, t.pX8, t.pY4, t.flex, t.flexCol, t.itemsCenter, t.mT8]}>
							{(props.session["store"] == 1) ?
							<View style={[t.wFull]}>
								<WideBtn trigger={()=>{props.navigation.navigate("ManageProducts")}} delay={200} inner="Products" />
								<WideBtn trigger={()=>{props.navigation.navigate("ManageStore")}} delay={400} inner="Page" />
								<WideBtn trigger={()=>{props.navigation.navigate("ManagePost", {id: props.session["store_id"]})}} delay={600} inner="Posts" />
								<WideBtn trigger={()=>{props.navigation.navigate("Orders")}} delay={800} inner="Orders" />
								<WideBtn trigger={()=>{props.navigation.navigate("ScanOrder")}} delay={1000} inner="Scan order" />
								<WideBtn inner="Sign out" style={[t.textRed600]} delay={1200} trigger={()=>{signOut()}} />
							</View>
							:
							<View style={[t.wFull]}>
								<WideBtn inner="Sign out" style={[t.textRed600]} delay={1000} trigger={()=>{signOut()}} />
							</View>
							}
						</View>
					</View>
				</ScrollView>
			)
		}
	}

	return (
		<SafeAreaView style={[{backgroundColor: "#F6F6F6"}, t.flex, t.flexCol, t.wFull, t.hFull]}>

			<TouchableOpacity style={[t.absolute, t.flex, t.itemsCenter, t.justifyCenter, t.bgWhite, t.p4, t.roundedFull, {bottom: 100}, t.z20, t.right0, t.mR4,
			{
				shadowColor: 'rgba(0, 0, 0, 0.4)',
				shadowOffset: {width: 0, height: 2},
				shadowRadius: 8,
				elevation: 4,
			}]} onPress={()=>{props.navigation.navigate("Cart")}}>
					<Ionicons name="md-cart-outline" size={24} color="black" />
			</TouchableOpacity>
			
			<BlurView intensity={90} tint="light" style={[t.wFull, {height: 90}, t.absolute, t.bottom0, t.z40, {backgroundColor: "#ffffffe6"}, t.flex, t.flexRow, t.itemsCenter, t.justifyEvenly]}>
				<TouchableOpacity style={[t.flex, t.flexCol, t.itemsCenter]} onPress={()=>{setPageIndex(0)}}>
					<Octicons name="home" size={24} color="black" />
					<Text style={[{fontFamily: "Kodchasan_light"}]}>Home</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[t.flex, t.flexCol, t.itemsCenter]} onPress={()=>{getPosts(); setPageIndex(1)}}>
					<MaterialCommunityIcons name="post-outline" size={24} color="black" />
					<Text style={[{fontFamily: "Kodchasan_light"}]}>Posts</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[t.flex, t.flexCol, t.itemsCenter]} onPress={()=>{setPageIndex(2)}}>
					<AntDesign name="staro" size={24} color="black" />
					<Text style={[{fontFamily: "Kodchasan_light"}]}>Saved</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[t.flex, t.flexCol, t.itemsCenter]} onPress={()=>{setPageIndex(3)}}>
					<Ionicons name="person-outline" size={24} color="black" />
					<Text style={[{fontFamily: "Kodchasan_light"}]}>Profile</Text>
				</TouchableOpacity>
			</BlurView>

			{flow()}

		</SafeAreaView>
	)
}