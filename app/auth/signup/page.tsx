'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error } = await supabase.auth.signUp({ email, password})
        if (error) {
            console.error('Error signing up:', error.message)
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
                            <CardFooter>
                                <Button type='submit' className='w-full mt-4'>Sign Up</Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
