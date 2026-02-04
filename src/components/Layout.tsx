import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Language } from '../lib/language'

interface LayoutProps {
  children: ReactNode
  language: Language
  setLanguage: (lang: Language) => void
}

export default function Layout({ children, language, setLanguage }: LayoutProps) {
  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} />
      {children}
      <Footer language={language} />
    </>
  )
}
