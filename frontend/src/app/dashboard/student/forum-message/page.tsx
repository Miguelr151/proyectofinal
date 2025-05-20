'use client'

import { useEffect, useState } from 'react'
import api from '@/app/services/api'

export default function ForumMessagePage() {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [authorNombre, setAuthorNombre] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedText, setEditedText] = useState('')
  const [commentsMap, setCommentsMap] = useState<{ [key: string]: any[] }>({})
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({})
  const [commentAuthors, setCommentAuthors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    api.get('/forum-message').then(res => {
      const data = Array.isArray(res.data) ? res.data : []
      setMessages(data)

      data.forEach(m => {
        api.get(`/comment/by-message/${m.id}`).then(res => {
          setCommentsMap(prev => ({ ...prev, [m.id]: res.data }))
        })
      })
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage || !authorNombre) return

    try {
      const res = await api.post('/forum-message', {
        author: authorNombre,
        type: 'student',
        message: newMessage
      })
      setMessages(prev => [...prev, res.data])
      setNewMessage('')
      setAuthorNombre('')
    } catch (err) {
      console.error('Error al enviar mensaje', err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/forum-message/${id}`)
      setMessages(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      console.error('Error al eliminar mensaje', err)
    }
  }

  const handleEdit = async (id: string, updatedMessage: string) => {
    try {
      const res = await api.patch(`/forum-message/${id}`, { message: updatedMessage })
      setMessages(prev =>
        prev.map(m => (m.id === id ? { ...m, message: res.data.message } : m))
      )
      setEditingId(null)
      setEditedText('')
    } catch (err) {
      console.error('Error al editar mensaje', err)
    }
  }

  const handleCommentSubmit = async (messageId: string) => {
    const text = commentInputs[messageId]
    const author = commentAuthors[messageId]
    if (!text || !author) return

    try {
      const res = await api.post('/comment', { author, text, messageId })
      setCommentsMap(prev => ({
        ...prev,
        [messageId]: [...(prev[messageId] || []), res.data]
      }))
      setCommentInputs(prev => ({ ...prev, [messageId]: '' }))
      setCommentAuthors(prev => ({ ...prev, [messageId]: '' }))
    } catch (err) {
      console.error('Error al comentar', err)
    }
  }

  const handleDeleteComment = async (commentId: string, messageId: string) => {
    try {
      await api.delete(`/comment/${commentId}`)
      setCommentsMap(prev => ({
        ...prev,
        [messageId]: prev[messageId].filter(c => c.id !== commentId)
      }))
    } catch (err) {
      console.error('Error al eliminar comentario', err)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🗣️ Foro del Estudiante</h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Tu nombre"
            value={authorNombre}
            onChange={(e) => setAuthorNombre(e.target.value)}
            className="flex-1 p-2 rounded border border-gray-300 text-black shadow-sm"
          />
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 rounded border border-gray-300 text-black shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md"
          >
            Enviar
          </button>
        </form>

        <div className="space-y-6">
          {messages.map((m) => (
            <div key={m.id} className="bg-white text-black rounded-lg p-4 shadow-md">
              {editingId === m.id ? (
                <>
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(m.id, editedText)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium">{m.message}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    ✍️ Autor: <span className="font-semibold">{m.author}</span> | 🎓 Tipo:{' '}
                    {m.type}
                  </p>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => {
                        setEditingId(m.id)
                        setEditedText(m.message)
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}

              {/* Comentarios */}
              <div className="mt-4 space-y-2">
                <h3 className="text-sm text-gray-800 font-semibold">💬 Comentarios:</h3>
                {(commentsMap[m.id] || []).map((c: any) => (
                  <div
                    key={c.id}
                    className="bg-gray-100 text-black p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm">{c.text}</p>
                      <button
                        onClick={() => handleDeleteComment(c.id, m.id)}
                        className="text-red-600 hover:text-red-700 text-xs"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Autor: {c.author}</p>
                  </div>
                ))}
              </div>

              {/* Input para comentar */}
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={commentAuthors[m.id] || ''}
                  onChange={(e) =>
                    setCommentAuthors((prev) => ({ ...prev, [m.id]: e.target.value }))
                  }
                  className="flex-1 p-2 border border-gray-300 rounded text-black"
                />
                <input
                  type="text"
                  placeholder="Escribe un comentario..."
                  value={commentInputs[m.id] || ''}
                  onChange={(e) =>
                    setCommentInputs((prev) => ({ ...prev, [m.id]: e.target.value }))
                  }
                  className="flex-1 p-2 border border-gray-300 rounded text-black"
                />
                <button
                  onClick={() => handleCommentSubmit(m.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Comentar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
