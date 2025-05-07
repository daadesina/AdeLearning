import { View, TouchableOpacity, Text, Alert } from "react-native"
import { useRouter } from "expo-router"

export default function SideBar(){
    const router = useRouter()
    return(
        <View style={{flex: 1, height: '100%', rowGap: 30, paddingVertical: '40%', paddingHorizontal: '10%'}}>
            <TouchableOpacity 
                onPress={() => {
                    Alert.alert(
                        "About this app", 
                        "This app is a practice project by Abdullah Adesina Dhirkullah on May 6, 2025, built to reinforce my Mobile Development skills using React Native and Expo. It's designed to help learn key technologies like Terminal, Python, HTML, CSS, JavaScript, and more.",
                        [{
                            text: "OKAY",
                            onPress: () => {}
                        }]
                    )
                }}
            >
                <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: '500'}}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        "Warning", 
                        "Are you sure you want to Logout?",
                        [
                            {
                                text: "CANCEL",
                                onPress: () => {}
                            },
                            {
                                text: "Logout",
                                onPress: () => {
                                    router.push('/')
                                }
                            }
                        ]
                    )
                }}
            >
                <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: '500'}}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}