'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const [rol, setRol] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true) // evita renderizar en SSR
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const parsed = JSON.parse(user)
        setRol(parsed.rol || null)
      } catch (err) {
        console.error('Error al leer usuario:', err)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setRol(null)
    router.push('/login')
  }

  if (!isClient) return null // evita render en SSR

  return (
    <nav className="w-full bg-blue-700 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        {!rol && (
          <>
            <button onClick={() => router.push('/login')} className="hover:underline">Login</button>
            <button onClick={() => router.push('/register-student')} className="hover:underline">Registro Estudiante</button>
            <button onClick={() => router.push('/register-tutor')} className="hover:underline">Registro Tutor</button>
          </>
        )}

        {rol === 'student' && (
          <>
            <button onClick={() => router.push('/dashboard/student')} className="hover:underline">Dashboard Estudiante</button>
            <button onClick={() => router.push('/dashboard/student/session')} className="hover:underline">Sesiones</button>
            <button onClick={() => router.push('/dashboard/student/forum')} className="hover:underline">Foro</button>
            <button onClick={() => router.push('/dashboard/student/resource')} className="hover:underline">Recursos</button>
            <button onClick={() => router.push('/dashboard/student/comment')} className="hover:underline">Comentarios</button>
          </>
        )}

        {rol === 'tutor' && (
  <>
    <button onClick={() => router.push('/dashboard/tutor')} className="hover:underline">Dashboard Tutor</button>
    <button onClick={() => router.push('/dashboard/tutor/session')} className="hover:underline">Mis Sesiones</button>
  </>
)}
      </div>

      {rol && (
        <button onClick={handleLogout} className="hover:underline text-sm">Cerrar sesión</button>
      )}
    </nav>
  )
}
