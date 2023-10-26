import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '@/hooks/useAuth'

export default function GatewayRoute() {
  // const { isWeb3Active, authToken } = useAuth()

  // return !authToken || !isWeb3Active ? <Outlet /> : <Navigate to="/spin" />
  return <Outlet />
}
