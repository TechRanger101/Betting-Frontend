import { Web3ReactProvider } from '@web3-react/core'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { RootWrapper, AppWrapper } from './style'
// import { ConnectionType } from './constants/web3'
import { connectors } from './lib/crypto/connectors'

// Pages
// import { SpinPage } from './pages/SpinPage'
// import ComingSoonPage from './pages/ComingSoonPage'
import AccessKeyPage from './pages/AccessKeyPage'

// Components
import { Header } from './components/shared/Header'
import { LeftPanel } from './components/shared/Panels/LeftPanel'
import { RightPanel } from './components/shared/Panels/RightPanel'
import { Particles } from './components/shared/Particles'
import { ToastContextProvider } from './contexts/ToastContext'
import { Toast } from './components/Toast'
import ProtectedRoute from './components/shared/CustomRoutes/ProtectedRoute'
import GatewayRoute from './components/shared/CustomRoutes/GatewayRoute'
// import { DicePage } from './pages/DicePage'

interface IRoute {
  path: string
  page: JSX.Element
}

const routes: IRoute[] = [
  {
    path: '/',
    page: <AccessKeyPage />,
    // page: <SpinPage />,
    //   // page: <HomePage />,
    //   // page: <Navigate to="/spin" replace />,
    //   // page: <div>Hello</div>,
  },
  // {
  //   path: '/spin',
  //   page: <SpinPage />,
  // },
  // {
  //   path: '/bomb',
  //   page: <ComingSoonPage gameName="bombs" />,
  // },
  // {
  //   path: '/plinko',
  //   page: <ComingSoonPage gameName="plinko" />,
  // },
  // {
  //   path: '/dice',
  //   page: <DicePage />,
  // },
  // {
  //   path: '/slots',
  //   page: <ComingSoonPage gameName="slots" />,
  // },
]

const ConditionalLayout = () => {
  const { pathname } = useLocation()
  const isGateway = pathname === '/'

  return (
    <Web3ReactProvider connectors={connectors}>
      <RootWrapper>
        {/* {!isGateway && <Header />} */}
        <AppWrapper>
          {/* {!isGateway && <Particles />} */}
          {/* {!isGateway && <LeftPanel />} */}
          <Toast />
          <AccessKeyPage />
          {/* <Routes> */}
          {/*   <Route element={<GatewayRoute />}> */}
          {/*     <Route path="/" element={<AccessKeyPage />} /> */}
          {/*   </Route> */}

          {/*   <Route element={<ProtectedRoute />}> */}
          {/*     {routes.map(route => ( */}
          {/*       <Route key={route.path} path={route.path} element={route.page} /> */}
          {/*     ))} */}
          {/*   </Route> */}
          {/* </Routes> */}
          {/* {!isGateway && <RightPanel />} */}
        </AppWrapper>
      </RootWrapper>
    </Web3ReactProvider>
  )
}

const RootApp = () => {
  return (
    <Router>
      {/* TODO: Setup side panel components (which listens to active page and popup wherever needed) */}
      <ConditionalLayout />
    </Router>
  )
}

const App = () => {
  // const hasAccess = useAccessKeyStore(state => state.hasAccess)

  // if (!hasAccess) {
  //   return <AccessKeyPage />
  // }

  return (
    <ToastContextProvider>
      <RootApp />
    </ToastContextProvider>
  )
}

export default App
