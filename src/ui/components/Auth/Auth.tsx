import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { useUser } from '../../lib/contextStores/userStore';

const Auth = () => {
    const[ isSignUp, setIsSignUp ] = React.useState(false)
    const { userData } = useUser();
    if(userData?.isLoggedIn) {
      console.log("User is already logged in, redirecting to home page...");
        window.location.href = '/home';
        return null; // Prevent rendering if user is already logged in
    }

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