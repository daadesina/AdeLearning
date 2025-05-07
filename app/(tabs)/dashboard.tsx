import { View, Text, SafeAreaView, StatusBar, Image, Animated, Easing, Platform, StyleSheet, 
    TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { DashboardImages } from "./assets/images";
import { LinearGradient } from 'expo-linear-gradient';
import AvailableCourses from "./components/dashboard/availableCourses";
import Terminal from "./components/dashboard/terminal";
import SideBar from "./components/dashboard/sideBar";
import { useRef } from 'react';



const progress = new Animated.Value(0);

Animated.timing(progress, {
  toValue: 1,
  duration: 1000,
  useNativeDriver: false,
}).start();

export default function Dashboard(){
    const [userName, setUserName] = useState("")
    const [usedTime, setUsedTime] = useState(46)
    const [wholeTime, setWholeTime] = useState(60)
    const [progressLevel, setProgressLevel] = useState(0)
    const [showSideBar, setShowSideBar] = useState(false)
    const sidebarAnim = useRef(new Animated.Value(-300)).current;


    useEffect(() => {
        const getName = async () => {
            const GetuserName = await AsyncStorage.getItem('userName')
            const userNameJs = GetuserName ? JSON.parse(GetuserName) : ""
            setUserName(userNameJs)
        }
        getName()
    }, [])

    useEffect(() => {
        if ( wholeTime > 0){
            setProgressLevel((usedTime / wholeTime) * 100)
        }else{
            setProgressLevel(0)
        }
    }, [usedTime, wholeTime])

    useEffect(() => {
        if (showSideBar) {
            Animated.timing(sidebarAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
                easing: Easing.out(Easing.ease),
            }).start();
        } else {
            Animated.timing(sidebarAnim, {
                toValue: -300,
                duration: 300,
                useNativeDriver: false,
                easing: Easing.in(Easing.ease),
            }).start();
        }
    }, [showSideBar]);
    

    
    
    
    
    return(
        <SafeAreaView style={{backgroundColor: '#1F1F39', flex: 1, paddingTop: StatusBar.currentHeight}}>
            <StatusBar backgroundColor="#3D5CFF"/> 
            {/* Top */}
            <View style={{backgroundColor: "#3D5CFF", height: 150, padding: StatusBar.currentHeight}}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>Hi, {userName}</Text>
                        <Text style={{color: 'white', fontSize: 14}}>Let’s start learning</Text>
                    </View>
                    <TouchableOpacity onPress={() => {showSideBar == false ? setShowSideBar(true) : setShowSideBar(false)}}>
                        <Image source={DashboardImages.profilePicture} style={{width: 36, height: 49.98}}/>
                    </TouchableOpacity>
                </View>
            </View>
            {/* The Semi-Overlay */}
            <View style={[{backgroundColor: '#2F2F42', paddingHorizontal: 20, paddingVertical: 30,
                width: '90%', alignSelf: 'center', borderRadius: 15, marginTop: -50,
                
            }, myStyle.myShadow]}>
                {/* Top here */}
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{rowGap: 4}}>
                        <Text style={{color: '#B8B8D2', fontSize: 12}}>Learned today</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', columnGap: 2 }}>
                            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{usedTime}min</Text>
                            <Text style={{color: '#B8B8D2', fontSize: 10}}>/ {wholeTime}min</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{color: '#3D5CFF', fontSize: 12}}>My courses</Text>
                    </View>
                </View>
                {/* Down here */}
                <View style={{marginTop: 5, height: 10, backgroundColor: '#444', borderRadius: 5, overflow: 'hidden'}}>
                    <Animated.View
                        style={{
                        height: 10,
                        width: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', `${progressLevel}%`],
                        }),
                        }}
                    >
                        <LinearGradient
                            colors={['#FFFFFF', '#FF5106']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ flex: 1 }}
                            />
                    </Animated.View>
                    </View>
            </View>
            {/* Courses */}
            <View>
                <AvailableCourses/>
            </View>
            <View>
                <Terminal/>
            </View>

            {/* Sidebar */}
            {showSideBar && 
            <TouchableOpacity 
                style={{
                    width: '100%', position: 'absolute',
                    top: 0, bottom: 0, left: 0, right: 0,
                }}
                activeOpacity={1}
                onPress={() => setShowSideBar(false)}
            >
                <TouchableWithoutFeedback>
                    <Animated.View 
                        style={[{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '80%',
                            backgroundColor: '#2F2F42',
                            transform: [{ translateX: sidebarAnim }],
                        }, myStyle.myShadow]}
                    >
                        <SideBar />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        }


        </SafeAreaView>
    )
}

const myStyle = StyleSheet.create({
    myShadow:{
        ...Platform.select({
            ios: {
                shadowColor: '#FFFFFF',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 50
            }
        }),
        
    }
})