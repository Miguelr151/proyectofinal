'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/services/api'

export default function UploadResourcePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [uploadedBy, setUploadedBy] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !url || !uploadedBy) {
      setError('Faltan campos obligatorios')
      return
    }

    try {
      await api.post('/resource', { title, description, url, uploadedBy })
      setSuccess(true)
      setTimeout(() => router.push('/dashboard/tutor/resource'), 1500)
    } catch {
      setError('Error al subir recurso')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📤 Subir recurso</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white text-black p-6 rounded shadow">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL del recurso"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Subido por"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">Recurso subido con éxito</p>}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Subir
        </button>
      </form>
    </div>
  )
}
