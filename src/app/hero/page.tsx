'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Hero() {
  const [hover, setHover] = useState(false)

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-pink-500 to-red-500">
      <Image
        src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*8vXGJVqZPoIcq3ehaJdHag.png"
        alt="Imagen de fondo"
        layout="fill"
        objectFit="cover"
        quality={100}
        
      />
      <div className="absolute z-10 text-center">
        {/* <h1 className="text-6xl text-teal-800 font-bold mb-4 animate-pulse">Luchando por la privacidad</h1> */}
       
      
      </div>
    </div>
  )
}