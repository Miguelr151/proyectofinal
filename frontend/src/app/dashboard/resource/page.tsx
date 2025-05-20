'use client'

import { useEffect, useState } from 'react'
import api from '@/app/services/api'

export default function ResourceListPage() {
  const [resources, setResources] = useState<any[]>([])

  useEffect(() => {
    api.get('/resource')
      .then(res => setResources(res.data))
      .catch(err => {
        console.error('Error al cargar recursos', err)
        setResources([])
      })
  }, [])

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-2xl font-bold text-center mb-6">📚 Recursos disponibles</h1>

      {resources.length === 0 ? (
        <p className="text-center text-gray-400">No hay recursos aún.</p>
      ) : (
        <div className="space-y-4">
          {resources.map((r) => (
            <div key={r.id} className="bg-white text-black p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="text-sm text-gray-700 mb-1">{r.description || 'Sin descripción'}</p>
              <p className="text-xs text-gray-500 mb-2">Subido por: {r.uploadedBy}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Ver recurso
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
