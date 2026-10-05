import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '../components/AuthProvider';
import { TelegramGlider } from '../components/TelegramGlider';
import { Toaster } from 'sonner';
import PwaRegister from '../components/PwaRegister';
export const metadata: Metadata={title:'LingoDash','description':'Language learning dashboard'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body><AuthProvider><PwaRegister/>{children}<TelegramGlider/><Toaster richColors position="top-center"/></AuthProvider></body></html>}
