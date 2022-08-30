import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  let userObj= JSON.parse(localStorage.getItem('user')|| '{}')
    let auth = {'token': userObj.token}
    return(
      auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;