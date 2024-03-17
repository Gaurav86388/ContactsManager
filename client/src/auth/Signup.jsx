import React, {useState, useEffect} from 'react'
import "./Signup.css"
const Signup = ({handleSignUpToggle}) => {

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

   
      fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(signup)
      })
    .then((res)=>res.json())
    .then(data=>{
      
      console.log(data)
      handleSignUpToggle()
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
}

export default Signup