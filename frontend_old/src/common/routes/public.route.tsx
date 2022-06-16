import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../providers/auth.provider'

export const PublicRoute = () => {
  const { getUser } = useAuth()
  return !getUser() ? <Outlet /> : <Navigate to="/welcome" />
}
