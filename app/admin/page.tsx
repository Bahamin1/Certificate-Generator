'use client'

import CertificateForm from '@/components/CertificateForm'
import Login from '@/components/Login'
import { useState } from 'react'

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = async (username: string, password: string) => {
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        // Dynamically import the action to avoid bundling issues if strictly client side, 
        // but simple import is fine in Next 14/15 client components.
        const { loginAction } = await import('@/app/actions/auth')
        const isValid = await loginAction(formData)

        if (isValid) {
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
