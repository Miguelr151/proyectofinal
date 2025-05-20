'use client'

import { useState, useEffect } from 'react'
import api from '@/app/services/api'
import { useRouter } from 'next/navigation'

export default function CreateSessionPage() {
  const router = useRouter()
  const [tutors, setTutors] = useState([])
  const [tutorId, setTutorId] = useState('')
  const [topic, setTopic] = useState('')
  const [duration, setDuration] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    api.get('/tutor')
      .then(res => setTutors(res.data))
      .catch(() => setError('Error al cargar tutores'))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = localStorage.getItem('user')
    const student = user ? JSON.parse(user) : null

    if (!student || !tutorId || !topic || !duration || !scheduledAt) {
      setError('Todos los campos son obligatorios')
      return
    }

    try {
      const res = await api.post('/session', {
        studentId: student.id,
        tutorId,
        topic,
        duration,
        scheduledAt
      })

      if (res.status === 201 || res.status === 200) {
        setMensaje('Sesión agendada con éxito')
        setTimeout(() => router.push('/dashboard/student'), 2000)
      }
    } catch (err) {
      console.error(err)
      setError('Error al agendar sesión')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">📅 Agendar sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tutor</label>
            <select
              value={tutorId}
              onChange={(e) => setTutorId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded shadow-sm text-black"
            >
              <option value="">Selecciona un tutor</option>
              {tutors.map((t: any) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded shadow-sm text-black"
              placeholder="Ej: Álgebra, programación..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded shadow-sm text-black"
              placeholder="Ej: 1 hora"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y hora</label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded shadow-sm text-black"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {mensaje && <p className="text-green-600 text-sm">{mensaje}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition-colors"
          >
            Agendar sesión
          </button>
        </form>
      </div>
    </div>
  )
}
