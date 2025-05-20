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
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Recursos disponibles</h1>
      {resources.length === 0 ? (
        <p className="text-gray-400 text-center">No hay recursos subidos aún.</p>
      ) : (
        resources.map(resource => (
          <div key={resource.id} className="bg-white text-black p-4 rounded-lg shadow mb-4">
            <h2 className="text-xl font-semibold">{resource.title}</h2>
            <p className="text-sm text-gray-600 mb-1">{resource.description}</p>
            <a
              href={resource.url}
              target="_blank"
              className="text-blue-600 underline text-sm"
              rel="noopener noreferrer"
            >
              Ver recurso
            </a>
            <p className="text-xs text-gray-500 mt-2">Subido por: {resource.uploadedBy}</p>
          </div>
        ))
      )}
    </div>
  )
}
