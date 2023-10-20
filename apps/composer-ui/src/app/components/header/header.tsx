'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import APP_ROUTES from '@/constants/routes';

export default function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between / sticky top-0 / px-6 py-4 / border-0 border-b border-solid border-slate-200 / bg-white">
      <nav>
        <ul className="flex gap-4 items-center">
          <li>
            <Link className="font-medium mr-5" href="/">
              Nirdhara
            </Link>
          </li>
          {APP_ROUTES.map(({ name, path }) => (
            <li key={path}>
              <Link className={pathname === path ? 'text-blue-500' : 'text-slate-400'} href={path}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
