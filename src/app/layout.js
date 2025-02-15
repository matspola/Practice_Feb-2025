'use client';

import "./globals.css";

const Layout = ({ children }) => {
  return (
    <html lang="ru">
      <body className="bg-gray-50 font-sans">
        <header className="bg-white shadow py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-gray-800 text-2xl font-bold">Список пользователей из Dummy</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="bg-gray-200 py-4 mt-8">
          <div className="container mx-auto text-center">
            <p className="text-gray-600">© 2025 by Pola</p>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default Layout;