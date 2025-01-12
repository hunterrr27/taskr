'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (error) {
                console.error('Error signing up:', error.message)
            } else {
                router.refresh()
                router.push('/dashboard')
            }
        } catch (err) {
            console.error('Error:', err)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <motion.div 
                initial={{ y: 300, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.5, duration: 0.8 }}
                className='w-[350px]'
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignUp}>
                            <div className='space-y-4'>
                                <Input
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Input
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <CardFooter className='flex flex-col space-y-4 mt-4'>
                                <Button type='submit' className='w-full'>Sign Up</Button>
                                <p className='text-sm text-gray-600'>
                                    Already have an account?{' '}
                                    <Link href='/auth/signin' className='text-blue-600 hover:underline'>
                                        Sign in
                                    </Link>
                                </p>
                                <p className='text-xs text-gray-500 text-center'>
                                    By signing up, you agree to our{' '}
                                    <Link href='/terms' className='underline'>Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link href='/privacy' className='underline'>Privacy Policy</Link>
                                </p>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}