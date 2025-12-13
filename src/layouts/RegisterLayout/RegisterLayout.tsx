import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'
import { Outlet } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Outlet />
      <Footer />
    </div>
  )
}
