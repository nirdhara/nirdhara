import '../styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'reactflow/dist/style.css';
import { RootStoreProvider } from '../../storage/app-store/root-store-provider';
import packageJson from '../../package.json';
import AppHeader from './components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nirdhara Composer',
  description: 'Open Source LLM workflow builder',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pageRendersTime = new Date().toString().slice(0, Math.max(0, new Date().toString().indexOf('(') - 1));
  return (
    <html lang="en">
      <body
        className={inter.className}
        data-version={packageJson?.version ?? ''}
        data-render-time={pageRendersTime}
        data-build-time={process?.env?.buildTime ?? ''}
      >
        <div className="flex flex-col h-full">
          <AppHeader />
          <main className="flex-1 overflow-y-auto h-full / bg-slate-100">
            <RootStoreProvider>{children}</RootStoreProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
