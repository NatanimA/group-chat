import React, { useState,useEffect } from 'react'
import { FaGooglePlusG,FaLinkedinIn,FaFacebookF} from 'react-icons/fa'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import Splash from '../Splash/Splash'
import { validatePassword } from '../../constants/util-func'
import { GoogleLogin,useGoogleLogin,googleLogout } from '@react-oauth/google';
import './Auth.scss'



const Auth = () => {
  const [user,setUser] = useState(null);
  const [slider,setSlider] = useState(true);
  const [userRegister,setUserRegister] = useState({email:'',password:''});
  const [userLogin,setUserLogin] = useState({email:'',password:''});
  const [error,setError] = useState(null)
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate()


  const [loading,setLoading] = useState(false)
  useEffect(() => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      },4000)
  }, []);

  useEffect(() => {
    if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log("AX RES: ",res)
                    })
                    .catch((err) => console.log(err));
            }
  },[user])

  const login = useGoogleLogin({
    onSuccess:(response) => {
        setUser(response)
    },
    onError: (error) => {
        console.log("Error: ",error)
    }
  })
  const responseMessage = (response) => {
        console.log(response);
    };
  const errorMessage = (error) => {
      console.log(error);
  };

  const handleRegisterInput = (e) => {
    setPasswordError('')
    setUserRegister((pv) => {
            return {...pv,
            [e.target.name]: e.target.value}
    })
  }

  const handleLoginInput = (e) => {
    setError(null)
    setUserLogin(
            {...userLogin,
            [e.target.name]: e.target.value}
        )
  }

  const handleUserRegistration = async (e) => {
    e.preventDefault()
    const { email,password} = userRegister;
    if (!validatePassword(password)) {
        setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
        return;
    }
    try{
        // const {user} = await createUserWithEmailAndPassword(auth,email,password);
        // localStorage.setItem('token',JSON.stringify(user.accessToken))
        navigate("/")
    }catch(err){
        setPasswordError("Email is already taken.")
    }
  }

  const handleUserAuthentication = async (e) => {
    e.preventDefault()
    const { email,password} = userLogin;
    try{
        // const {user} = await signInWithEmailAndPassword(auth,email,password)
        // localStorage.setItem('token',JSON.stringify(user.accessToken))
        navigate("/")
    }catch(error) {
        setError(error)
    }
  }

  const handleOverLay =() => {
    setSlider(!slider)
  }



  return (
    <>
        {loading ? (<Splash />) : (
            <>
                <h2>Welcome to Buna Time</h2>
                <div className={slider ? "container" : "container right-panel-active"} id="container">
                    <div className="form-container sign-up-container">
                        <form onSubmit={handleUserRegistration}>
                            <h1>Create Account</h1>
                            <div className="social-container">
                                <a>
                                    <FaFacebookF />
                                </a>

                                <a onClick={() => login()}>
                                    <FaGooglePlusG />
                                </a>
                                <a>
                                    <FaLinkedinIn />
                                </a>
                            </div>
                            <span>or use your email for registration</span>
                            {passwordError ? <span style={{color:'#FF0000'}}>{passwordError}</span> : null}
                            <input onChange={handleRegisterInput} name='email' type="email" placeholder="Email" required/>
                            <input onChange={handleRegisterInput} name='password' type="password" placeholder="Password" required/>
                            <button type='submit'>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleUserAuthentication}>
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a>
                                    <FaFacebookF />
                                </a>
                                <a>
                                    <FaGooglePlusG />
                                </a>
                                <a>
                                    <FaLinkedinIn />
                                </a>
                            </div>
                            <span>or use your account</span>
                            {error ? <span style={{color:'#FF0000'}}>Email or password is not correct</span> : null}
                            <input onChange={handleLoginInput} name='email'  type="email" placeholder="Email" required/>
                            <input onChange={handleLoginInput} name='password'  type="password" placeholder="Password" required/>
                            <a href="#">Forgot your password?</a>
                            <button type='submit'>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost btn-post" style={{backgroundColor:'#fff',color:"#000"}}  id="signIn" onClick={handleOverLay}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost btn-post" style={{backgroundColor:'#fff',color:"#000"}} id="signUp" onClick={handleOverLay}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}

    </>
  )
}

export default Auth
