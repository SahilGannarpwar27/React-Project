import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

const ResetPasswordRedirect = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const uidb64 = searchParams.get('uidb64')
    const token = searchParams.get('token')

    if (window.location.hostname === 'skill-sync-fe-dev-c40942737da9.herokuapp.com') {
      // If running locally, redirect to actual reset password page
      navigate(`/reset-password-local?uidb64=${uidb64}&token=${token}`)
    }
    // } else {
    //   // If on deployed frontend, redirect to localhost
    //   window.location.href = `http://localhost:3000/reset-password?uidb64=${uidb64}&token=${token}`;
    // }
  }, [searchParams, navigate])

  return <p>Redirecting...</p>
}

export default ResetPasswordRedirect
