import { useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'

export default function Navbar() {
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()

  async function handleSignOut() {
    await authClient.signOut()
    navigate('/login')
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <span className="font-semibold text-gray-900">Helpdesk</span>
        <div className="flex items-center gap-4">
          {session?.user.name && (
            <span className="text-sm text-gray-600">{session.user.name}</span>
          )}
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
