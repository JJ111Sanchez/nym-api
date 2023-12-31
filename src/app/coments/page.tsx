'use client'
import Image from 'next/image'

export default function Comments() {
  const comments = [
    { name: 'Javier', comment: 'Este es un comentario.', avatar: '/1.jpg' },
    { name: 'Pedro', comment: 'Este es otro comentario.', avatar: '/1.jpg' },
    { name: 'El socio', comment: 'Este es un comentario más.', avatar: '/1.jpg' },
  ]

  return (
    <div className="flex flex-col justify-center items-center  space-y-4 pt-8 pb-8  sm:flex-row sm:space-y-0 sm:space-x-4">
      {comments.map((comment, index) => (
        <div key={index} className="flex justify-center flex-wrap items-center space-x-4 bg-black text-white shadow-lg p-4 rounded-lg">
          <Image
            src={comment.avatar}
            alt={comment.name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold">{comment.name}</h3>
            <p className="text-lg">{comment.comment}</p>
          </div>
        </div>
         ))}
        </div>
        )
      
}
