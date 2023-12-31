'use client'
import Image from 'next/image'

export default function Card() {
  const cards = [
    { title: 'Nym Sdk', subtitle: 'Subtítulo 1', image: '/1.jpg' },
    { title: 'Host pocket', subtitle: 'Subtítulo 2', image: '/OIG 2.jpeg' },
    { title: 'NextJs', subtitle: 'Subtítulo 3', image: '/OIG.jpeg' },
  ]

  return (
    <div className="flex flex-wrap justify-center pt-8">
      {cards.map((card, index) => (
        <div key={index} className="m-4 shadow-lg bg-gradient-to-r from-black via-orange-900 to-black rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Image
            src={card.image}
            alt={card.title}
            width={500}
            height={300}
            objectFit="cover"
            quality={100}
          />
          <div className="p-4">
            <h2 className="text-2xl text-white mb-2 font-bold ">{card.title}</h2>
            <p className="text-xl text-white">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}