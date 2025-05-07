import { View, Text, useWindowDimensions, TouchableOpacity, StatusBar } from "react-native"
import { Image } from "react-native"
import { LandingPageImages } from "../../assets/images"

export default function ThirdPage(prop: any){
    const windowHeight = useWindowDimensions().height

    const signupBtn = prop.signupBtn
    const loginBtn = prop.loginBtn
  return(
    <View style={{flex: 1, paddingTop: windowHeight * 0.08, alignItems: 'center'}}>
        <StatusBar hidden/>
        <View style={{ rowGap: 20, paddingHorizontal: 10 }}>
            {/* For the skip */}
            <View style={{padding: 10}}>
                <Text style={{color: '#B8B8D2', textAlign: 'right', fontSize: 14, opacity: 0}}></Text>
            </View>

            {/* For the image */}
            <View>
                <Image source={LandingPageImages.thirdPageImage} style={{width: 260, height: 260}}/>
            </View>
            {/* Large text */}
            <View>
                <Text style={{color: '#EAEAFF', textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>Create your own</Text>
                <Text style={{color: '#EAEAFF', textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>study plan</Text>
            </View>
            {/* Small text */}
            <View>
                <Text style={{color: '#F4F3FD', textAlign: 'center', fontSize: 16}}>Study according to the</Text>
                <Text style={{color: '#F4F3FD', textAlign: 'center', fontSize: 16}}>study plan, make study</Text>
                <Text style={{color: '#F4F3FD', textAlign: 'center', fontSize: 16}}>more motivated</Text>
            </View>
            {/* Three Dots */}
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Image source={LandingPageImages.thirdPageThreeDot} style={{ height: 5, width: 66 }}/>
            </View>
            {/* Signup and Login Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                <TouchableOpacity style={{width: '47%'}} onPress={signupBtn}>
                    <Text style={{backgroundColor: '#3D5CFF', width:'100%', fontSize: 16, 
                        color: '#F4F3FD', textAlign: 'center', paddingVertical: 15, borderRadius: 12}}
                        >Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '47%'}} onPress={loginBtn}>
                    <Text style={{backgroundColor: '#858597', width:'100%', fontSize: 16, 
                        color: '#F4F3FD', textAlign: 'center', paddingVertical: 15, borderRadius: 12}}
                        >Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}