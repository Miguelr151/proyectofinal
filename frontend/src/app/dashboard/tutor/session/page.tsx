'use client'

import { useEffect, useState } from 'react'
import api from '@/app/services/api'

export default function TutorSessionsPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const tutor = JSON.parse(user)
      api.get(`/session/tutor/${tutor.id}`)
        .then(res => setSessions(res.data))
        .catch(err => {
          console.error(err)
          setError('Error al cargar las sesiones')
        })
    }
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Sesiones asignadas</h1>

      {error && <p className="text-red-500">{error}</p>}

      {sessions.length === 0 ? (
        <p>No tienes sesiones asignadas</p>
      ) : (
        sessions.map((s, i) => (
          <div key={i} className="bg-white text-black p-4 rounded mb-2">
            <p><strong>Estudiante:</strong> {s.studentId}</p>
            <p><strong>Tema:</strong> {s.topic}</p>
            <p><strong>Duración:</strong> {s.duration} minutos</p>
            <p><strong>Fecha:</strong> {new Date(s.scheduledAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  )
}
