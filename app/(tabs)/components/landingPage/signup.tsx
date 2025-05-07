import { View, Text, useWindowDimensions, TouchableOpacity, TextInput, Alert, StatusBar } from "react-native"
import { Image } from "react-native"
import { LandingPageImages } from "../../assets/images"
import { useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Signup(prop: any){
    const [showPassword, setShowPassword] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

    const showSignupSuccessful = prop.showSignupSuccessful

    const handlePasswordVisiblity = () => {
        if (hidePassword){
            setHidePassword(false)
            setShowPassword(true)
        }else{
            setHidePassword(true)
            setShowPassword(false)
        }
    }

    const handleConfirmPasswordVisiblity = () => {
        if (hideConfirmPassword){
            setHideConfirmPassword(false)
            setShowConfirmPassword(true)
        }else{
            setHideConfirmPassword(true)
            setShowConfirmPassword(false)
        }
    }
    
    const showLoginFunc = prop.showLoginFunc

    const windowHeight = useWindowDimensions().height
    const windowWidth = useWindowDimensions().width

    // Validation
    const handleSignupValidation = async () => {
        // Check if no space is empty
        let isEmpty = true
        if (email.trim() == "" && 
            username.trim() == "" && 
            password.trim() == "" && 
            confirmPassword.trim() == ""){
            Alert.alert("WARNING", "Fill all input fields")
        }else if (email.trim() == ""){
            Alert.alert("WARNING", "Enter your Email")
        }else if(username.trim() == ""){
            Alert.alert("WARNING", "Enter your Username")
        }else if(password.trim() == ""){
            Alert.alert("WARNING", "Enter your Password")
        }else if(confirmPassword.trim() == ""){
            Alert.alert("WARNING", "confirm your Password")
        }
        else{
            isEmpty = false
        }

        

        if (!isEmpty){
            // Confirm Password
            let isConfirmed = false
            if (password == confirmPassword){
                isConfirmed = true
            }else{
                Alert.alert("WARNING", "Confirm Password does not match")
            }

            if (isConfirmed){
                // Collect the data
                const data = {
                    "email": email,
                    "username": username,
                    "password": password,
                    "confirmPassword": confirmPassword
                }
                
                try{
                    // Get all Existing data in signupData
                    const GetSignupData = await AsyncStorage.getItem('signupData')
                    // Convert it to JavaScript Object
                    const SignupDataJs = GetSignupData ? JSON.parse(GetSignupData) : []
                    // Push the new data to it
                    SignupDataJs.push(data)

                    // Save the updated list
                    await AsyncStorage.setItem('signupData', JSON.stringify(SignupDataJs))
                    setEmail("")
                    setUsername("")
                    setPassword("")
                    setConfirmPassword("")
                    showSignupSuccessful()
                }
                catch(error){
                    Alert.alert("ERROR", "Sign Up Unsuccessful")
                    setEmail("")
                    setUsername("")
                    setPassword("")
                    setConfirmPassword("")
                }
            } 
        }
        

    }


  return(
    <View style={{flex: 1, paddingTop: windowHeight * 0.1, alignItems: 'center'}}>
        <StatusBar hidden/>
        <View style={{ rowGap: 20 }}>
            {/* Large text */}
            <View style={{paddingHorizontal: windowWidth * 0.07, rowGap:4}}>
                <Text style={{color: '#FFFFFF', fontSize: 32, fontWeight: 'bold'}}>Sign Up</Text>
                <Text style={{color: '#B8B8D2', fontSize: 12}}>Sign up for free by entering your details below</Text>
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

                {/* Username */}
                <View style={{rowGap: 5}}>
                    <Text style={{color: '#858597'}}>Username</Text>
                    <View style={{backgroundColor: '#3E3E55', borderRadius: 10, paddingHorizontal: 16}}>
                        <TextInput
                            style={{backgroundColor: 'transparent', color: '#FFFFFF', height: 40}}
                            keyboardType="default"
                            value={username}
                            onChangeText={text => setUsername(text)}
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

                {/* Confirm Password */}
                <View style={{rowGap: 5, height: 40, marginTop: 30}}>
                    <Text style={{color: '#858597'}}>Confirm Password</Text>
                    <View style={{backgroundColor: '#3E3E55', borderRadius: 10, flexDirection: 'row', 
                                    justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16}}>
                        <TextInput
                            style={{backgroundColor: 'transparent', color: '#FFFFFF', width: '80%', height: 40}}
                            keyboardType="default"
                            secureTextEntry = {hideConfirmPassword}
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
                        />
                        {hideConfirmPassword &&
                        <TouchableOpacity onPress={handleConfirmPasswordVisiblity} style={{height: '100%', justifyContent: 'center'}}>
                            <Image source={LandingPageImages.hidePasswordIcon} style={{width: 20, height: 13}}/>
                        </TouchableOpacity>
                        }

                        {showConfirmPassword &&
                        <TouchableOpacity onPress={handleConfirmPasswordVisiblity} style={{height: '100%', justifyContent: 'center'}}>
                            <Image source={LandingPageImages.showPasswordIcon} style={{width: 20, height: 13}}/>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
                {/* Button */}
                <View style={{ marginTop: 40 }}>
                    <TouchableOpacity onPress={handleSignupValidation}>
                        <Text style={{backgroundColor: '#3D5CFF', width: '100%', 
                            color: '#FFFFFF', paddingVertical: 14, textAlign: 'center',
                            borderRadius: 15, fontSize: 16, fontWeight: '600'
                        }}
                        >Create account</Text>
                    </TouchableOpacity>
                </View>
                {/* Login */}
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <Text style={{color: '#B8B8D2'}}>Already have an account？</Text>
                    <TouchableOpacity onPress={showLoginFunc}>
                        <Text style={{color: '#3D5CFF'}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>


        
    </View>
  )
}