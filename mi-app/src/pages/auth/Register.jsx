import { useState } from 'react'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  function handleRegister(e) {
    e.preventDefault()
    console.log('REGISTER:', form)
  }

  return (
    <>
    {view === 'register' && (
        <div className="auth-layout">
          <div className="auth-wrap">
            <div className="auth-card">
              <div className="auth-logo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"/>
                </svg>
              </div>
              <h2>Crear cuenta</h2>
              <p className="auth-sub">POST /register</p>
              <div className="field">
                <label>Correo electrónico</label>
                <input type="email" placeholder="usuario@correo.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="field">
                <label>Contraseña</label>
                <input type="password" placeholder="Mínimo 6 caracteres" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              <button className="btn btn-primary" onClick={handleRegister} disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"/></svg>
                {loading ? 'Creando...' : 'Registrarse'}
              </button>
              <div className="auth-footer">
                ¿Ya tienes cuenta? <a onClick={() => { setView('login'); setForm({ email: '', password: '' }) }}>Inicia sesión</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    
  )
}