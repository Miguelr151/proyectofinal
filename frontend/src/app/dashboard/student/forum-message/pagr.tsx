'use client'

import { useEffect, useState } from 'react'
import api from '@/app/services/api'

export default function ForumPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get('/forum-message')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Error al cargar el foro:', err))
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold mb-4">Foro de Discusión</h1>
      {posts.length === 0 ? (
        <p>No hay mensajes aún.</p>
      ) : (
        posts.map((msg: any) => (
          <div key={msg.id} className="bg-white text-black p-4 rounded mb-4">
            <h2 className="font-bold">{msg.titulo}</h2>
            <p>{msg.contenido}</p>
            <p className="text-sm text-gray-600 mt-1">Publicado por: {msg.autorNombre}</p>
          </div>
        ))
      )}
    </div>
  )
}
