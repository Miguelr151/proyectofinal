// 📁 src/app/dashboard/student/forum/page.tsx

'use client'

import { useEffect, useState } from 'react'
import api from '@/app/services/api'

export default function StudentForumPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/forum-message')
      .then(res => setPosts(res.data))
      .catch(err => {
        console.error(err)
        setError('Error al cargar mensajes del foro')
      })
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Foro de preguntas y respuestas</h1>
      {error && <p className="text-red-500">{error}</p>}

      {posts.length === 0 ? (
        <p>No hay mensajes en el foro aún.</p>
      ) : (
        posts.map((msg) => (
          <div key={msg.id} className="bg-white text-black p-4 rounded mb-3">
            <p><strong>Autor:</strong> {msg.author}</p>
            <p><strong>Tipo:</strong> {msg.type}</p>
            <p className="mt-1">{msg.message}</p>
            <p className="text-sm text-gray-500 mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  )
}
