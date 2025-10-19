import React, { useEffect } from 'react'
import { useAuthStore } from '../store/auth.store.js'
import { Navigate } from 'react-router-dom'

const RestrictedRoute = ({ children }) => {
  const { user, loading, checkAuth } = useAuthStore()

  useEffect(() => {
    if (user === null) {
      checkAuth();
    }
  }, [user, checkAuth]);

  if (loading) return <p>....Loading</p>
  if (user) return <Navigate to="/" />
  return children
}

export default RestrictedRoute