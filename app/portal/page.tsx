'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import CertificateForm from '@/components/CertificateForm'
import Login from '@/components/Login'
import { Home } from 'lucide-react'

export default function Portal() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = async (username: string, password: string) => {
        // In a real application, this would be an API call to your Java backend
        if (username === 'Gilava' && password === 'Afaridoun') {
            setIsLoggedIn(true)
            return true
        }
        return false
    }

    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('/api/hello')
            .then((response) => response.json())
            .then((data) => setMessage(data.message))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-4 pt-24">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Gilava English Academy Student Portal

            </h2>
            {isLoggedIn ? (
                <Home />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    )
}
