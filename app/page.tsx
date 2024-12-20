'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import CertificateForm from '../components/CertificateForm'
import Login from '../components/Login'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = async (username: string, password: string) => {
    // In a real application, this would be an API call to your Java backend
    if (username === '123' && password === '123') {
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Gilava English Academy Certificate Generator</h2>
      {isLoggedIn ? (
        <Tabs defaultValue="generate">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate Certificate</TabsTrigger>
          </TabsList>
          <TabsContent value="generate">
            <CertificateForm />
          </TabsContent>
          <TabsContent value="verify">
            <div className="mt-4">
              <h3 className="text-2xl font-bold mb-4">Certificate Verification</h3>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

