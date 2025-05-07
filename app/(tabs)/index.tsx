import { SafeAreaView, StatusBar } from "react-native"
import FirstPage from "./components/landingPage/firstPage"
import { GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler"
import { State } from "react-native-gesture-handler"
import { useState } from "react"
import SecondPage from "./components/landingPage/secondPage"
import ThirdPage from "./components/landingPage/thirdPage"
import Signup from "./components/landingPage/signup"
import Login from "./components/landingPage/login"
import SignupSuccessful from "./components/landingPage/signupSuccessful"
import ForgetPassword from "./components/landingPage/forgetPassword"

export default function Index(){
  const [showFirstPage, setShowFirstPage] = useState(true)
  const [showSecondPage, setShowSecondPage] = useState(false)
  const [showThirdPage, setShowThirdPage] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignupSuccessful, setShowSignupSuccessful] = useState(false)
  const [showForgetPassword, setShowForgetPassword] = useState(false)

  const handleGesture = (event: any) => {
    const { translationX, state } = event.nativeEvent;

    if (state === State.END){
      if (showFirstPage && translationX < -50){
        setShowFirstPage(false)
        setShowSecondPage(true)
        setShowThirdPage(false)
        setShowSignup(false)
        setShowLogin(false)
        setShowSignupSuccessful(false)
        setShowForgetPassword(false)
      }
      else if (showSecondPage && translationX > 50){
        setShowFirstPage(true)
        setShowSecondPage(false)
        setShowThirdPage(false)
        setShowSignup(false)
        setShowLogin(false)
        setShowSignupSuccessful(false)
        setShowForgetPassword(false)
      }
      else if (showSecondPage && translationX < -50){
        setShowFirstPage(false)
        setShowSecondPage(false)
        setShowThirdPage(true)
        setShowSignup(false)
        setShowLogin(false)
        setShowSignupSuccessful(false)
        setShowForgetPassword(false)
      }
      else if (showThirdPage && translationX > 50){
        setShowFirstPage(false)
        setShowSecondPage(true)
        setShowThirdPage(false)
        setShowSignup(false)
        setShowLogin(false)
        setShowSignupSuccessful(false)
        setShowForgetPassword(false)
      }
      else if (showSignup && translationX > 50){
        setShowFirstPage(false)
        setShowSecondPage(false)
        setShowThirdPage(true)
        setShowSignup(false)
        setShowLogin(false)
        setShowSignupSuccessful(false)
        setShowForgetPassword(false)
      }
      else if (showLogin && translationX > 50){
        setShowFirstPage(false)
        setShowSecondPage(false)
        setShowThirdPage(true)
        setShowSignup(false)
        setShowLogin(false)
        setShowSignupSuccessful(false)
        setShowForgetPassword(false)
      }
    }
  }
  // For Skip
  const skipFunc = () => {
    setShowFirstPage(false)
    setShowSecondPage(false)
    setShowThirdPage(true)
    setShowSignup(false)
    setShowLogin(false)
    setShowSignupSuccessful(false)
    setShowForgetPassword(false)
  }

  // For Signup
  const signupFunc = () => {
    setShowFirstPage(false)
    setShowSecondPage(false)
    setShowThirdPage(false)
    setShowSignup(true)
    setShowLogin(false)
    setShowSignupSuccessful(false)
    setShowForgetPassword(false)
  }

  // For Login
  const loginFunc = () => {
    setShowFirstPage(false)
    setShowSecondPage(false)
    setShowThirdPage(false)
    setShowSignup(false)
    setShowLogin(true)
    setShowSignupSuccessful(false)
    setShowForgetPassword(false)
  }

  // For Login
  const signupSuccessfulFunc = () => {
    setShowFirstPage(false)
    setShowSecondPage(false)
    setShowThirdPage(false)
    setShowSignup(false)
    setShowLogin(false)
    setShowSignupSuccessful(true)
    setShowForgetPassword(false)
  }

  // For ForgetPassword
  const ForgetPasswordFunc = () => {
    setShowFirstPage(false)
    setShowSecondPage(false)
    setShowThirdPage(false)
    setShowSignup(false)
    setShowLogin(false)
    setShowSignupSuccessful(false)
    setShowForgetPassword(true)
  }

  return(
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler onHandlerStateChange={handleGesture}>
        <SafeAreaView 
          style={{backgroundColor: '#1F1F39', flex: 1}}
                >
          
          {showFirstPage && <FirstPage skipFunc={skipFunc}/>}
          {showSecondPage && <SecondPage skipFunc={skipFunc}/>}
          {showThirdPage && <ThirdPage signupBtn={signupFunc} loginBtn={loginFunc}/>}
          {showSignup && <Signup showLoginFunc={loginFunc} showSignupSuccessful={signupSuccessfulFunc}/>}
          {showLogin && <Login showSignupFunc={signupFunc} showForgetPasswordFunc={ForgetPasswordFunc}/>}
          {showSignupSuccessful && <SignupSuccessful loginFunc={loginFunc}/>} 
          {showForgetPassword && <ForgetPassword signupFunc={signupFunc}/>}
        </SafeAreaView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}


