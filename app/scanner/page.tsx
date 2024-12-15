'use client'

import CertificateForm from '@/components/CertificateForm'
import Login from '@/components/Login'
import { useState } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = async (username: string, password: string) => {
    // In a real application, this would be an API call to your Java backend
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Gilava English Academy Certificate Generator</h2>
      {isLoggedIn ? (
        <CertificateForm />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

