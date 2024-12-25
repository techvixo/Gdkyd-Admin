import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

import { useQuery } from "@tanstack/react-query";
import BASEURL from '../../Constants';
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const id = localStorage.getItem("user_id");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null)
    const [loading, setLoading] =useState(true);
  const [searchValue, setSearchValue] = useState('');





// Obgerber state change set
useEffect( () => {
 const id = localStorage.getItem("id")
 const name = localStorage.getItem("name")
 const token = localStorage.getItem("token")
 const userdata = {
  id,
  name,
  token
 }
  setLoading(false)
  
  
}, [loading])
// console.log(uploadInfo)

    // Auth provider all information share>>>>>>
  const authInfo = {
    isAuthenticated,
    user,
    loading,
    setLoading,
    searchValue,
    setSearchValue
  }
  
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider