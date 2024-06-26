import React, {useState, useEffect, memo} from 'react'
import "./Signup.css"
import { useFileHandle } from '../context/Context'
const Signup = memo(function Signup ({handleSignUpToggle}){
  const {setAlertOn, setPressedButton} = useFileHandle()

  const [checkMatchPassword, setCheckMatchPassword] = useState(true)
  const [signup, setSignup] = useState({
    mailID: "",
    password: "",
    confirmPassword: ""
  })


  function addFormDetails(e){
    let newvalue = e.target.value
    let name = e.target.name
    setSignup(prev=>({...prev, [name]: newvalue}))
  }

  useEffect(()=>{

    setCheckMatchPassword(true)
  }, [setSignup.confirmPassword])



  function handleSignup(e){
    e.preventDefault()
    console.log(signup)
    if(signup.password !== signup.confirmPassword) return setCheckMatchPassword(false)

   
      fetch("https://contactsmanager-4ml8.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(signup)
      })
    .then((res)=>res.json())
    .then(data=>{
      
      if(data.message === 'Success register'){
        setPressedButton("signup")
        setAlertOn(true)
        
        handleSignUpToggle()
      }
      
    })
    .catch(e=>console.log(e))

    
}

  return (
    <div className='signup'>
        
        <h5 className='signup-message'>Create New Account</h5>
        
        <form onSubmit={handleSignup} className='signup-form'>

        <input type="text" required placeholder='Mail ID' id='mail-id'name="mailID" onChange={addFormDetails}/>
        <input type="password" required placeholder='Password' id='signup-password' name="password" onChange={addFormDetails}/>
        <input type="password" required placeholder='Confirm Password' id='signup-confirm-password'
        name="confirmPassword" onChange={addFormDetails}/>
        {!checkMatchPassword && <p id="incorrect-pass">Passwords do not match</p>}

        <input type="button" value="Sign Up" onClick={handleSignup} id="signup-signup-btn"/>
        </form>

        
        </div>
  )
})
export default Signup