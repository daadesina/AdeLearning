import { Link } from "expo-router"
import { View, Text, useWindowDimensions, TouchableOpacity, StatusBar } from "react-native"
import { Image } from "react-native"
import { LandingPageImages } from "../../assets/images"

export default function SecondPage(prop: any){
    const skipFunc = prop.skipFunc
    const windowHeight = useWindowDimensions().height
  return(
    <View style={{flex: 1, paddingTop: windowHeight * 0.08, alignItems: 'center'}}>
        <StatusBar hidden/>
        <View style={{ rowGap: 20 }}>
            {/* For the skip */}
            <TouchableOpacity onPress={skipFunc} style={{padding: 10}}>
                <Text style={{color: '#B8B8D2', textAlign: 'right', fontSize: 14}}>Skip</Text>
            </TouchableOpacity>

            {/* For the image */}
            <View>
                <Image source={LandingPageImages.secondPageImage} style={{width: 260, height: 260}}/>
            </View>
            {/* Large text */}
            <View>
                <Text style={{color: '#EAEAFF', textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>Quick and easy</Text>
                <Text style={{color: '#EAEAFF', textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>learning</Text>
            </View>
            {/* Small text */}
            <View>
                <Text style={{color: '#F4F3FD', textAlign: 'center', fontSize: 16}}>Easy and fast learning at</Text>
                <Text style={{color: '#F4F3FD', textAlign: 'center', fontSize: 16}}>any time to help you</Text>
                <Text style={{color: '#F4F3FD', textAlign: 'center', fontSize: 16}}>improve various skills</Text>
            </View>
            {/* Three Dots */}
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Image source={LandingPageImages.secondPageThreeDot} style={{ height: 5, width: 66 }}/>
            </View>
        </View>
    </View>
  )
}