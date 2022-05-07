import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function MainPage() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainPage
