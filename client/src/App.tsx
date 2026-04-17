import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

function Home() {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
      .catch(() => setMessage('Failed to connect to server'))
  }, [])

  return <h1>{message ?? 'Loading...'}</h1>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
