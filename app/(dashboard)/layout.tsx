     1|'use client';
     2|
     3|import type { ReactNode } from 'react';
     4|import { Sidebar } from '@/components/sidebar';
     5|import { TopBar } from '@/components/top-bar';
     6|
     7|export default function DashboardLayout({ children }: { children: ReactNode }) {
     8|  return (
     9|    <div className="flex h-screen flex-col overflow-hidden bg-black text-foreground">
    10|      <TopBar />
    11|      <div className="flex flex-1 overflow-hidden">
    12|        <Sidebar />
    13|        <main className="flex-1 overflow-y-auto p-6 relative">
    14|          {children}
    15|        </main>
    16|      </div>
    17|    </div>
    18|  );
    19|}
    20|