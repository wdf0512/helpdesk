import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { authClient } from './lib/auth-client'
import Login from './pages/Login'
import Home from './pages/Home'

const spinner = (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
  </div>
)

function ProtectedRoute() {
  const { data: session, isPending } = authClient.useSession()
  if (isPending) return spinner
  return session ? <Outlet /> : <Navigate to="/login" replace />
}

function GuestRoute() {
  const { data: session, isPending } = authClient.useSession()
  if (isPending) return spinner
  return session ? <Navigate to="/" replace /> : <Outlet />
}

export default function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
