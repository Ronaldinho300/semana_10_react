
import { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    if (!email) {
      alert('Ingresa tu correo')
      return
    }

    console.log('RECUPERAR PASSWORD:', email)

    // simulación frontend
    setSent(true)
  }

  return (
    <div className="auth-card">

      <h1>Recuperar contraseña</h1>

      {!sent ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">
            Enviar enlace
          </button>
        </form>
      ) : (
        <div>
          <p>📩 Se envió un enlace a tu correo (simulado)</p>

          <button onClick={() => setSent(false)}>
            Intentar de nuevo
          </button>
        </div>
      )}

      <p>
        ¿Recordaste tu cuenta? <a href="/">Login</a>
      </p>

    </div>
  )
}