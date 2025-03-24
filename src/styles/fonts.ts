import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const aileron = localFont({
  src: [
    {
      path: '../../public/fonts/Aileron-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Aileron-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Aileron-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-aileron',
})
