import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import OAuth from "../components/OAuth"
import {getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
import { ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const {name, email, password} = formData
  
  const navigate = useNavigate()

  const onChnage = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user
      
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy) //Update the database

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
    }
  }

    return (
      <>
          <div className="signUpPage"></div>
          <div className="signUpPageContainer">
            <header>
              <p className="pageHeader">Welcome!</p>
            </header>

            <main>
              <form className="form" onSubmit={onSubmit}>
              <input 
                  type="text"
                  className="nameInput"
                  placeholder=" Name"
                  id="name"
                  value={name}
                  onChange={onChnage}
                />

                <input 
                  type="email"
                  className="emailInput"
                  placeholder=" Email"
                  id="email"
                  value={email}
                  onChange={onChnage}
                />

                <div className="passwordInputDiv">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="passwordInput"
                    placeholder=" Password"
                    id="password"
                    value={password}
                    onChange={onChnage} 
                  />

                  <img 
                    src={visibilityIcon} 
                    alt="show password"
                    className="showPassword"
                    onClick={() => setShowPassword((prevState) => !prevState)} />
                </div>

                <Link 
                  to='/forgot-password'
                  className="forgotPasswordLink">
                    Forgot Password
                </Link>

                
                <button className="signUpButton"> Sign Up </button>
                
              </form>

              <OAuth />

              <Link to='/sign-in' className="registerLink">
                Sign In Instead
              </Link>

            </main>
          </div>
      </>
    )
  }
  
  export default SignUp