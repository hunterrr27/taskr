'use client'

import { useRouter } from 'next/navigation'
import { Calendar } from '@/components/ui/calendar'
import { motion } from 'framer-motion'

export default function Dashboard() {
    const router = useRouter()

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const formattedDate = new Intl.DateTimeFormat('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            }).format(selectedDate).replace(/\//g, '-')
            
            router.push(`/day/${formattedDate}`)
        }
    }

    return (
        <div className='mx-auto p-20 w-fit'>
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 5 }}
                className='text-2xl font-bold mb-4 flex justify-center'>
                {"Taskr".split("").map((char, index) => (
                    <motion.span 
                        key={index} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (index+1) * 0.1, duration: 0.3 }}
                    >
                        {char}
                    </motion.span>
                ))}
                <motion.svg
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-6 h-6 ml-2">
                    <path d="M5 13l4 4L19 7" />
                </motion.svg>
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.6 }}
                className='rounded-md shadow-md'>
                <Calendar
                    mode='single'
                    selected={new Date()}
                    onSelect={handleDateSelect}
                    className='rounded-md shadow-md'
                />
            </motion.div>
        </div>
    )
}
