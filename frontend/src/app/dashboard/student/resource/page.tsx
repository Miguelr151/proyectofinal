'use client'

import { useEffect, useState } from 'react'
import api from '@/app/services/api'

export default function ResourcePage() {
  const [resources, setResources] = useState([])

  useEffect(() => {
    api.get('/resource')
      .then(res => setResources(res.data))
      .catch(err => console.error('Error al cargar recursos:', err))
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold mb-4">Recursos Educativos</h1>
      {resources.length === 0 ? (
        <p>No hay recursos disponibles.</p>
      ) : (
        resources.map((r: any) => (
          <div key={r.id} className="bg-white text-black p-4 rounded mb-4">
            <h2 className="font-bold">{r.title}</h2>
            <p>{r.description}</p>
            {r.url && (
              <a href={r.url} target="_blank" className="text-blue-600 underline mt-2 inline-block">Ver recurso</a>
            )}
          </div>
        ))
      )}
    </div>
  )
}
