'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/services/api'

export default function RegisterTutorPage() {
  const router = useRouter()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [expertise, setExpertise] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre || !email || !bio || !expertise || !password) {
      setError('Todos los campos son obligatorios')
      return
    }

    try {
      const res = await api.post('/tutor', {
        name: nombre,
        email,
        bio,
        expertise,
        password,
      })

      if (res.status === 201 || res.status === 200) {
        setMensaje('Registro exitoso. Redirigiendo...')
        setTimeout(() => router.push('/login'), 2000)
      }
    } catch (err: any) {
      console.error(err.response?.data || err.message)
      setError('Error al registrar tutor')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">Registro de Tutor</h1>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded text-black"
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded text-black"
        />

        <textarea
          placeholder="Biografía"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded text-black"
        />

        <input
          type="text"
          placeholder="Área de experiencia"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded text-black"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded text-black"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {mensaje && <p className="text-green-600 text-sm mb-2">{mensaje}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded mt-2 hover:bg-green-700"
        >
          Registrarse
        </button>
      </form>
    </div>
  )
}
