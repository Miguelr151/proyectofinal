'use client'

export default function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel del Estudiante</h1>
      <ul className="space-y-2">
        <li className="bg-white shadow p-4 rounded">📅 Tutoría con Ana - 18 de mayo - 10:00 AM</li>
        <li className="bg-white shadow p-4 rounded">📅 Tutoría con Jorge - 21 de mayo - 3:00 PM</li>
      </ul>
    </div>
  )
}
