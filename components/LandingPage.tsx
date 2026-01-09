'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, BookOpen, Award, CheckCircle, Users, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-blue-500/30">
            {/* Hero Section */}
            <div className="relative isolate pt-14">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <Image
                        src="/hero-bg.png"
                        alt="Global Education Network"
                        fill
                        className="object-cover object-center opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-900/60 to-gray-900" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
                </div>

                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mb-8 flex justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-blue-300 ring-1 ring-white/10 hover:ring-white/20">
                                Admissions Open for 2026 Winter Cohort{' '}
                                <a href="#" className="font-semibold text-white">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    Read more <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-serif">
                            Education Without <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Borders</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Join a global community of learners. Experience world-class English education through our immersive online platform and state-of-the-art physical campuses across the globe.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/portal">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white text-lg px-8 h-14 rounded-full shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
                                    Start Your Journey
                                </Button>
                            </Link>
                            <a href="#features" className="text-sm font-semibold leading-6 text-white flex items-center hover:text-blue-300 transition-colors">
                                Explore Programs <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                        {[
                            { id: 1, name: 'Active Students', value: '5,000+' },
                            { id: 2, name: 'Countries Reached', value: '25+' },
                            { id: 3, name: 'Certified Graduates', value: '12,000+' },
                        ].map((stat) => (
                            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-400">{stat.name}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-24 sm:py-32 bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-400">Why Choose Gilava?</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">
                            Everything you need to master English
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-400">
                            We combine traditional academic excellence with cutting-edge technology to deliver a learning experience that works for everyone, everywhere.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {[
                                {
                                    name: 'Online Excellence',
                                    description: 'Live interactive classes with certified native speakers, available 24/7 from anywhere in the world.',
                                    icon: Globe,
                                },
                                {
                                    name: 'Physical Hubs',
                                    description: 'Modern campuses in major cities for immersive, face-to-face learning and cultural exchange events.',
                                    icon: Users,
                                },
                                {
                                    name: 'Global Certification',
                                    description: 'Receive internationally recognized certificates upon completion, verifiable instantly via our secure blockchain portal.',
                                    icon: Award,
                                },
                                {
                                    name: 'Personalized Path',
                                    description: 'AI-driven curriculum that adapts to your learning speed, strengths, and goals.',
                                    icon: GraduationCap, // Replaced BrainCircuit with GraduationCap for safety if icon missing
                                },
                                {
                                    name: 'Expert Mentors',
                                    description: 'One-on-one coaching sessions with industry veterans and linguistic experts.',
                                    icon: CheckCircle,
                                },
                                {
                                    name: 'Resource Library',
                                    description: 'Unlimited access to thousands of hours of premium content, books, and interactive exercises.',
                                    icon: BookOpen,
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="flex flex-col bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 hover:border-blue-500/30">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                        <feature.icon className="h-6 w-6 flex-none text-blue-400" aria-hidden="true" />
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                                        <p className="flex-auto">{feature.description}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:px-16 lg:px-8">
                <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-900">
                    {/* Simple gradient alternative to bg image here */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                </div>
                <div className="mx-auto max-w-2xl text-center relative z-10">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Ready to start your journey?
                        <br />
                        Join Gilava Academy today.
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                        Sign up for a free assessment test or verify your existing credentials.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/portal">
                            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-bold">
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/portal?tab=verify">
                            <Button variant="link" className="text-white hover:text-blue-300">
                                Verify a Certificate <span aria-hidden="true">→</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-white/10">
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">
                        <span className="text-gray-400 text-sm">© 2026 Gilava English Academy. All rights reserved.</span>
                    </div>
                    <div className="mt-8 md:order-1 md:mt-0">
                        <p className="text-center text-xs leading-5 text-gray-500">
                            Designed for Excellence.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
