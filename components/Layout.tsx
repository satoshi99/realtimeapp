import React, { FC, ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ title = 'Realtime App', children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex w-screen flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  )
}
