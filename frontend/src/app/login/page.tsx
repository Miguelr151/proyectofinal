'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/services/api'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tipo, setTipo] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!tipo || !email || !password) {
      setError('Todos los campos son obligatorios')
      return
    }

    try {
      const endpoint = tipo === 'student' ? '/student' : '/tutor'
      const res = await api.get(`${endpoint}?email=${email}`)

      if (!res.data || res.data.length === 0) {
        setError('Usuario no encontrado')
        return
      }

      const user = res.data[0]

      if (user.password && user.password !== password) {
        setError('Contraseña incorrecta')
        return
      }

      // ✅ Guardamos también el rol
      user.rol = tipo
      localStorage.setItem('user', JSON.stringify(user))

      if (tipo === 'student') {
        router.push('/dashboard/student')
      } else {
        router.push('/dashboard/tutor')
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
      setError('Error al iniciar sesión')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">Iniciar sesión</h1>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded text-black"
        >
          <option value="">Selecciona tu rol</option>
          <option value="student">Estudiante</option>
          <option value="tutor">Tutor</option>
        </select>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
