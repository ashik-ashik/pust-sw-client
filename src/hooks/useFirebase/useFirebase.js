import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut, deleteUser } from "firebase/auth";
import { useEffect, useState } from "react";
const useFirebase = () => {
  const auth = getAuth();
  const [user, setNewUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isUnload, setUnload] = useState(true)
  const [name, setName] = useState(null);
  

  // Registration by email and password
  const memberRegister = (email, password, fullName) => {
    setName(fullName);
    console.log(email, password)
    return createUserWithEmailAndPassword(auth, email, password)
    
  };

  // Login function by email and password
  const memberLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // monitoring the user
  useEffect(()=>{
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setNewUser(user)
        const uid = user.uid;
      } else {
        setNewUser(null)
      }
      setLoading(false)
    });
  }, [auth]);


  // log out function
  const memberLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  // account delete
  const deleteAccount = () => {
    deleteUser(user).then(() => {
      // User deleted.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }
  console.log(user)

  return {
    auth,
    name,
    user,
    setNewUser,
    memberRegister,
    memberLogin,
    isLoading,
    setLoading,
    updateProfile,
    memberLogOut,
    isUnload, 
    setUnload,
    deleteAccount
  }
}
export default useFirebase;