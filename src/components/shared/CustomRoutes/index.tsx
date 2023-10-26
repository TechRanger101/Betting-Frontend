import { Navigate, Outlet } from 'react-router-dom'

import { getAuthToken } from '@/lib/http/auth'

export default function ProtectedRoute() {
  const authToken = getAuthToken()

  return authToken ? <Outlet /> : <Navigate to="/" />
}
