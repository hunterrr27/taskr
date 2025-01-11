import React from "react";
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Taskr | Plan your day",
  description: "Plan your day with Taskr",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  const childElement = children as React.ReactElement;
  const props = childElement.props as { segment?: string };
  const childSegment = React.isValidElement(children) && 
    props &&
    typeof props === 'object' &&
    'segment' in props
    ? props.segment
    : null;

  if (!session && childSegment && !String(childSegment).startsWith('auth')) {
    redirect('/auth/signin');
  }

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}