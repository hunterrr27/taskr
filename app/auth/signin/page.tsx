'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({ email, password})
        if (error) {
            console.error('Error signing in:', error.message)
        } else {
            router.push('/dashboard')
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
                        <CardTitle>Sign In</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignIn}>
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
                                <Button type='submit' className='w-full'>Sign In</Button>
                                <p className='text-sm text-gray-600'>
                                    Don&apos;t have an account?{' '}
                                    <Link href='/auth/signup' className='text-blue-600 hover:underline'>
                                        Sign up
                                    </Link>
                                </p>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
