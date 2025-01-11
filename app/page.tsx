import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Taskr | Sign Up",
    description: "Sign up for Taskr to manage your tasks",
};

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  } else {
    redirect('/auth/signin')
  }

  // This won't be reached due to redirects, but TypeScript needs a return
  return null
}