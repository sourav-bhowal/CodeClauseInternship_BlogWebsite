
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark !scroll-smooth">
      <body>
        <div className="relative w-full flex items-center justify-center">
          
        </div>
        {children}
      </body>
    </html>
  );
}
