import React, { useEffect } from 'react'
import { useAuthStore } from '../store/auth.store.js'
import { Navigate } from 'react-router-dom'
import Spinner from './Spinner'

const ProtectedRoute = ({ children }) => {
  const { user, loading, checkAuth } = useAuthStore()

  useEffect(() => {
    if (user === null) {
      checkAuth();
    }
  }, [user, checkAuth]);

  if (loading) return <Spinner className="my-12" />
  if (!user) return <Navigate to="/login" />
  return children
}

export default ProtectedRoute