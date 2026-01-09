'use client'

import CertificateForm from '@/components/CertificateForm'
import Login from '@/components/Login'
import { useState } from 'react'

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = async (username: string, password: string) => {
        // Simple client-side check for MVP
        if (username === 'Gilava' && password === 'Afaridoun') {
            setIsLoggedIn(true)
            return true
        }
        return false
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
                    <p className="text-slate-500 mt-2">Generate and manage certificates</p>
                </div>

                {isLoggedIn ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CertificateForm />
                    </div>
                ) : (
                    <div className="max-w-md mx-auto">
                        <Login onLogin={handleLogin} />
                    </div>
                )}
            </div>
        </div>
    )
}
