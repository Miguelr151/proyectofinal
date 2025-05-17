'use client'

import { useEffect, useState } from 'react'
import api from '@/app/services/api'

export default function CommentPage() {
  const [comments, setComments] = useState([])

  useEffect(() => {
    api.get('/comment')
      .then(res => setComments(res.data))
      .catch(err => console.error('Error al cargar comentarios:', err))
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold mb-4">Comentarios</h1>
      {comments.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        comments.map((c: any) => (
          <div key={c.id} className="bg-white text-black p-4 rounded mb-4">
            <p>{c.content}</p>
            <p className="text-sm text-gray-600 mt-1">Autor: {c.authorNombre}</p>
          </div>
        ))
      )}
    </div>
  )
}
