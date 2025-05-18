// 📁 Ubicación sugerida: src/app/dashboard/student/session/page.tsx

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
    // 🔁 Cargar lista de tutores
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
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Agendar sesión</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">

        <label className="block mb-2">Tutor</label>
        <select
          value={tutorId}
          onChange={(e) => setTutorId(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Selecciona un tutor</option>
          {tutors.map((t: any) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <label className="block mb-2">Tema</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2">Duración</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2">Fecha y hora</label>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {mensaje && <p className="text-green-600 mb-2">{mensaje}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Agendar sesión
        </button>
      </form>
    </div>
  )
}
