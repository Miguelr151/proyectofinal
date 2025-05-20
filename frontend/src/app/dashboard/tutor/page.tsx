'use client'

import { useEffect, useState } from 'react'
import api from '@/app/services/api'

export default function TutorDashboard() {
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem('user')
    const tutor = user ? JSON.parse(user) : null

    if (tutor?.id) {
      api.get(`/session/tutor/${tutor.id}`)
        .then(res => setSessions(res.data))
        .catch(() => setSessions([]))
        .finally(() => setLoading(false))
    }
  }, [])

  const marcarComoCompletada = async (id: string) => {
    try {
      await api.patch(`/session/${id}`, { status: 'completada' })
      setSessions(prev =>
        prev.map(s => s.id === id ? { ...s, status: 'completada' } : s)
      )
    } catch (err) {
      console.error('Error al completar sesión', err)
    }
  }

  const cancelarSesion = async (id: string) => {
    try {
      await api.patch(`/session/${id}`, { status: 'cancelada' })
      setSessions(prev =>
        prev.map(s => s.id === id ? { ...s, status: 'cancelada' } : s)
      )
    } catch (err) {
      console.error('Error al cancelar sesión', err)
    }
  }

  const renderStatus = (status: string) => {
    const base = 'inline-block px-2 py-1 rounded text-xs font-bold '
    if (status === 'completada') return base + 'bg-green-200 text-green-800'
    if (status === 'cancelada') return base + 'bg-red-200 text-red-800'
    return base + 'bg-yellow-200 text-yellow-800'
  }

  return (
    <div className="p-6 text-white min-h-screen bg-neutral-900">
      <h1 className="text-2xl font-bold mb-4">👨‍🏫 Panel del Tutor</h1>

      {loading ? (
        <p className="text-gray-300">Cargando sesiones...</p>
      ) : sessions.length === 0 ? (
        <p className="text-gray-400">No tienes sesiones asignadas aún.</p>
      ) : (
        <ul className="space-y-3">
          {sessions.map((s: any) => (
            <li key={s.id} className="bg-white text-black shadow p-4 rounded space-y-1">
              <div>👨‍🎓 Estudiante: {s.studentName}</div>
              <div>🗓️ Fecha: {new Date(s.scheduledAt).toLocaleString()}</div>
              <div>📌 Estado: <span className={renderStatus(s.status)}>{s.status}</span></div>

              {s.status !== 'completada' && s.status !== 'cancelada' && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => marcarComoCompletada(s.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Marcar como completada
                  </button>
                  <button
                    onClick={() => cancelarSesion(s.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Cancelar sesión
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
