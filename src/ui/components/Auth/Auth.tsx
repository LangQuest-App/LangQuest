import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Auth = () => {
    const[ isSignUp, setIsSignUp ] = React.useState(false)
  return (
    <>
    {
        isSignUp ? (
            <SignUp toggleState= {setIsSignUp}/>
        ) : (
            <SignIn toggleState= {setIsSignUp} />
        )
    }

    </>
  )
}

export default Auth