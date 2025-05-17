'use client'

import { useEffect, useState } from 'react'
import api from '@/app/services/api'

export default function StudentSessionsPage() {
  const [sesiones, setSesiones] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user?.id) {
      api.get(`/session/student/${user.id}`).then((res) => {
        setSesiones(res.data)
      }).catch((err) => {
        console.error('Error al obtener sesiones:', err)
      })
    }
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold mb-4">Mis sesiones</h1>
      {sesiones.length === 0 ? (
        <p>No tienes sesiones programadas.</p>
      ) : (
        <ul className="space-y-4">
          {sesiones.map((s: any) => (
            <li key={s.id} className="bg-white text-black p-4 rounded shadow">
              {s.titulo || `Sesion con ${s.tutorNombre}`} - {s.fecha} - {s.hora}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
