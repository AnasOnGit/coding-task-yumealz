import './globals.css'
import type { Metadata } from 'next'
import { Cuprum } from 'next/font/google'

// theme
import { ThemeProvider } from "@/components/theme-provider"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// toast
import { Toaster } from "@/components/ui/toaster"




const cuprum = Cuprum({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yumealz Interview Task',
  description: 'Yumealz Interview Task',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cuprum.className}><ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Header/>
        {children}
        <Toaster />
      <Footer />
      </ThemeProvider></body>
    </html>
  )
}
