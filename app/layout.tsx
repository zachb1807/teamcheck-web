import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body className="">
        <Providers>{children}</Providers>
        
      </body>
    </html>
  )
}