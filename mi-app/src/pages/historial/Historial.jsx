import { useState } from 'react'

export default function Historial() {
  const [filtro, setFiltro] = useState('')

  // datos simulados (luego vendrán de la API)
  const logs = [
    { id: 1, accion: 'CREAR PRODUCTO', usuario: 'admin', fecha: '2026-04-27' },
    { id: 2, accion: 'APROBAR COTIZACIÓN', usuario: 'vendedor', fecha: '2026-04-26' },
    { id: 3, accion: 'REGISTRO CLIENTE', usuario: 'cliente', fecha: '2026-04-25' }
  ]

  const filtrados = logs.filter(l =>
    l.accion.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="dashboard">

      <h1>📊 Historial del Sistema</h1>

      <input
        placeholder="Buscar acción..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <div className="list">

        {filtrados.map(log => (
          <div key={log.id} className="card">
            <h3>{log.accion}</h3>
            <p>👤 {log.usuario}</p>
            <small>📅 {log.fecha}</small>
          </div>
        ))}

      </div>

    </div>
  )
}