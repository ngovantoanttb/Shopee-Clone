import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

export function useRequireAuth() {
  const { isAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()

  const requireAuth = async (callback: () => Promise<void> | void) => {
    if (!isAuthenticated) {
      navigate(path.login, {
        state: { from: location.pathname }
      })
      return
    }

    await callback()
  }

  return { requireAuth }
}
