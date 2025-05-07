import { View, Text, useWindowDimensions, TouchableOpacity, TextInput, Alert, StatusBar } from "react-native"
import { Image } from "react-native"
import { LandingPageImages } from "../../assets/images"
import { useState } from "react"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Login(prop: any){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hideStatusBar, setHideStatusBar] = useState(true)
   
    const [showPassword, setShowPassword] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)

    const router = useRouter()

    const handlePasswordVisiblity = () => {
        if (hidePassword){
            setHidePassword(false)
            setShowPassword(true)
        }else{
            setHidePassword(true)
            setShowPassword(false)
        }
    }
    const showSignupFunc = prop.showSignupFunc
    const showForgetPasswordFunc = prop.showForgetPasswordFunc
    const windowHeight = useWindowDimensions().height
    const windowWidth = useWindowDimensions().width


    // Validation
    const handleSignupValidation = async () => {
        let isValidated = false
        // Collect the data
        const data = {
            "email": email,
            "password": password
        }
        // Get signupData from AsyncStorage
        const GetSignupData = await AsyncStorage.getItem('signupData')
        const SignupDataJs = GetSignupData ? JSON.parse(GetSignupData) : []

        for (const user of SignupDataJs){
            if (data.email == user.email && data.password == user.password){
                // Firstly Clear everything in userName
                await AsyncStorage.setItem('userName', JSON.stringify([]))
                // Then Store the new username
                await AsyncStorage.setItem('userName', JSON.stringify(user.username))
                isValidated = true
                break
            }
        }

        if (isValidated){
            setHideStatusBar(false)
            router.push('/dashboard')
            isValidated = false
            setEmail("")
            setPassword("")
        }else{
            setEmail("")
            setPassword("")
            Alert.alert('WARNING', 'Invalid Email or Password')
        }
    }
  return(
    <View style={{flex: 1, paddingTop: windowHeight * 0.1, alignItems: 'center'}}>
        {hideStatusBar && <StatusBar hidden/>}
        <View style={{ rowGap: 20 }}>
            {/* Large text */}
            <View style={{paddingHorizontal: windowWidth * 0.07, rowGap:4}}>
                <Text style={{color: '#FFFFFF', fontSize: 32, fontWeight: 'bold'}}>Log in</Text>
                <Text style={{color: '#B8B8D2', fontSize: 12}}>Welcome back! Please log in to continue</Text>
            </View>
            {/* THE FORM PART */}
            <View style={{ backgroundColor: '#2F2F42', flex: 1, paddingHorizontal: windowWidth * 0.07, 
                            width: windowWidth, paddingVertical: 28, rowGap: 20, borderTopStartRadius: 15, borderTopEndRadius: 15  }}>
                {/* Email */}
                <View style={{rowGap: 5}}>
                    <Text style={{color: '#858597'}}>Email</Text>
                    <View style={{backgroundColor: '#3E3E55', borderRadius: 10, paddingHorizontal: 16}}>
                        <TextInput
                            style={{backgroundColor: 'transparent', color: '#FFFFFF', height: 40}}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            autoCapitalize="none" 
                        />
                    </View>
                </View>

                
                {/* Password */}
                <View style={{rowGap: 5, height: 40}}>
                    <Text style={{color: '#858597'}}>Password</Text>
                    <View style={{backgroundColor: '#3E3E55', borderRadius: 10, flexDirection: 'row', 
                                    justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16}}>
                        <TextInput
                            style={{backgroundColor: 'transparent', color: '#FFFFFF', width: '80%', height: 40}}
                            keyboardType="default"
                            secureTextEntry = {hidePassword}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                        {hidePassword &&
                        <TouchableOpacity onPress={handlePasswordVisiblity} style={{height: '100%', justifyContent: 'center'}}>
                            <Image source={LandingPageImages.hidePasswordIcon} style={{width: 20, height: 13}}/>
                        </TouchableOpacity>
                        }

                        {showPassword &&
                        <TouchableOpacity onPress={handlePasswordVisiblity} style={{height: '100%', justifyContent: 'center'}}>
                            <Image source={LandingPageImages.showPasswordIcon} style={{width: 20, height: 13}}/>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
                {/* Forget Password */}
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
                    <TouchableOpacity onPress={ async () => {
                        await AsyncStorage.clear();
                        showForgetPasswordFunc();
                    }}>
                        <Text style={{color: '#B8B8D2', fontSize: 14}}>Forget password?</Text>
                    </TouchableOpacity>
                </View>

                
                {/* Button */}
                <View>
                    <TouchableOpacity onPress={handleSignupValidation}>
                        <Text style={{backgroundColor: '#3D5CFF', width: '100%', 
                            color: '#FFFFFF', paddingVertical: 14, textAlign: 'center',
                            borderRadius: 15, fontSize: 16, fontWeight: '600'
                        }}
                        >Log In</Text>
                    </TouchableOpacity>
                </View>
                {/* Login */}
                <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: 20}}>
                    <Text style={{color: '#B8B8D2'}}>Don’t have an account？</Text>
                    <TouchableOpacity 
                            onPress={showSignupFunc}>
                        <Text style={{color: '#3D5CFF'}}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                {/* Line */}
                <View style={{alignItems: 'center', borderColor: '#858597', borderTopWidth: 1, marginTop: 20}}>
                    <Text style={{color: '#B8B8D2', marginTop: -11, backgroundColor: '#2F2F42', paddingHorizontal: 10}}>Or login with</Text>
                </View>

                {/* Google and Facebook Logo buttons */}
                <View style={{flexDirection: "row", justifyContent: 'center'}}>
                    <View style={{flexDirection: "row", columnGap: 50}}>
                        <TouchableOpacity>
                            <Image source={LandingPageImages.googleLogo} style={{width: 40, height: 40}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={LandingPageImages.facebookLogo} style={{width: 40, height: 40}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>


        
    </View>
  )
}