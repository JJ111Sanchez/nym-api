import React, { useState } from 'react';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-green-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Cyber<span className="text-pink-600">Punk</span>Header
        </h1>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
        
              
<svg className="h-6 w-6 text-pink-600"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

            ) : (
                <svg className="h-6 w-6 text-pink-600 "  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <li><a href="#" className="hover:text-pink-600">Inicio</a></li>
            <li><a href="#" className="hover:text-pink-600">Sobre</a></li>
            <li><a href="#" className="hover:text-pink-600">Servicios</a></li>
            <li><a href="#" className="hover:text-pink-600">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;