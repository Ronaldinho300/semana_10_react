import { useState } from 'react'

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  function handleLogin(e) {
    e.preventDefault()
    console.log('LOGIN:', form)
  }

  return (
    <>
    {view === 'login' && (
        <div className="auth-layout">
          <div className="auth-wrap">
            <div className="auth-card">
              <div className="auth-logo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z"/>
                </svg>
              </div>
              <h2>Iniciar sesión</h2>
              <p className="auth-sub">POST /login</p>
              <div className="field">
                <label>Correo electrónico</label>
                <input type="email" placeholder="usuario@correo.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="field">
                <label>Contraseña</label>
                <input type="password" placeholder="Tu contraseña" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              <button className="btn btn-primary" onClick={handleLogin} disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/></svg>
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
              <div className="auth-footer">
                ¿No tienes cuenta? <a onClick={() => { setView('register'); setForm({ email: '', password: '' }) }}>Regístrate aquí</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}