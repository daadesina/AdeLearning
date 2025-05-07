import { Link } from "expo-router"
import { View, Text, useWindowDimensions, TouchableOpacity, StatusBar } from "react-native"
import { Image } from "react-native"
import { LandingPageImages } from "../../assets/images"

export default function SignupSuccessful(prop: any){
    
    const loginFunc = prop.loginFunc

    const windowHeight = useWindowDimensions().height
    const windowWidth = useWindowDimensions().width
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar hidden/>
        <View>
            <View style={{backgroundColor: '#2F2F42', paddingVertical: windowHeight * 0.06, paddingHorizontal: 20, 
                            rowGap: 10, width: windowWidth * 0.8, borderRadius: 12}}>
                <View style={{alignItems: 'center'}}>
                    <Image source={LandingPageImages.signupSuccessfulMark} style={{width: 64, height: 64}}/>
                </View>
                <View>
                    <Text style={{color: '#FFFFFF', fontSize: 16, textAlign: 'center', fontWeight: '600'}}>Success</Text>
                </View>
                <View>
                    <Text style={{color: '#B8B8D2', fontSize: 12, textAlign: 'center'}}>Congratulations, you have completed</Text>
                    <Text style={{color: '#B8B8D2', fontSize: 12, textAlign: 'center'}}>your registration!</Text>
                </View>
                {/* Button */}
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={loginFunc}>
                        <Text style={{backgroundColor: '#3D5CFF', width: '100%', 
                            color: '#FFFFFF', paddingVertical: 14, textAlign: 'center',
                            borderRadius: 15, fontSize: 16, fontWeight: '600'
                        }}
                        >Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}