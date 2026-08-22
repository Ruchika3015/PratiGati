import './globals.css';
import { Sora, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { I18nProvider } from '@/lib/i18n';
import { LogisticsBackground } from '@/components/shared/logistics-background';

const sora = Sora({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600', '700', '800'] });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'PratiGati — Turn empty return trips into earning opportunities',
  description:
    'PratiGati is a predictive freight-capacity intelligence platform that matches empty truck return trips with shipment demand. Predict. Match. Optimize. Save. Make every return journey count.',
  openGraph: {
    title: 'PratiGati — Predictive Freight Capacity Intelligence',
    description:
      'Turn empty return trips into earning opportunities. Predict unused truck capacity, match with shipment demand, and make every return journey count.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <I18nProvider>
            <LogisticsBackground />
            <AuthProvider>
              {children}
              <Toaster position="bottom-right" richColors />
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
