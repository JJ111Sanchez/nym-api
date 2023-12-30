import Image from 'next/image'
import { useState } from 'react'

export default function Hero() {
  const [hover, setHover] = useState(false)

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Image
        src="/OIG.jpeg"
        alt="Imagen de fondo"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute z-10 text-center">
        <h1 className="text-6xl text-fuchsia-800 font-bold mb-4">Luchando por la privacidad</h1>
        <h2 className="text-4xl text-white mb-8">Subtítulo</h2>
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`px-8 py-3 text-2xl ${hover ? 'bg-white text-black' : 'bg-black text-white'} transition-colors duration-300`}
        >
          Botón
        </button>
      </div>
    </div>
  )
}