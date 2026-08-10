import localFont from 'next/font/local';
import { Dancing_Script } from 'next/font/google';

export const glacialIndifference = localFont({
  src: [
    {
      path: '../../public/fonts/GlacialIndifference-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GlacialIndifference-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-glacial',
});

export const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-script',
});

