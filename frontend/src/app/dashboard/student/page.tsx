'use client'

import { useEffect, useState } from 'react'
import api from '@/app/services/api'

export default function StudentDashboard() {
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem('user')
    const student = user ? JSON.parse(user) : null

    if (student?.id) {
      api.get(`/session/student/${student.id}`)
        .then(res => setSessions(res.data))
        .catch(() => setSessions([]))
        .finally(() => setLoading(false))
    }
  }, [])

  const renderStatus = (status: string) => {
    const base = 'inline-block px-2 py-1 rounded text-xs font-bold '
    if (status === 'completada') return base + 'bg-green-200 text-green-800'
    if (status === 'cancelada') return base + 'bg-red-200 text-red-800'
    return base + 'bg-yellow-200 text-yellow-800'
  }

  return (
    <div className="p-6 text-white min-h-screen bg-neutral-900">
      <h1 className="text-2xl font-bold mb-4">🎓 Panel del Estudiante</h1>

      {loading ? (
        <p className="text-gray-300">Cargando sesiones...</p>
      ) : sessions.length === 0 ? (
        <p className="text-gray-400">No tienes sesiones aún.</p>
      ) : (
        <ul className="space-y-3">
          {sessions.map((s: any) => (
            <li key={s.id} className="bg-white text-black shadow p-4 rounded space-y-1">
              <div>📚 Tutor: {s.tutorName}</div>
              <div>🗓️ Fecha: {new Date(s.scheduledAt).toLocaleString()}</div>
              <div>📌 Estado: <span className={renderStatus(s.status)}>{s.status}</span></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
