import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function MainPage({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default MainPage
