import Navbar from '@/components/shared/Navbar';
import Hero from "@/components/shared/Hero";



const BaseLayout = ({children, page = ''}) => {
  const isHomePage = () => page === 'Home';
  return (
    <div className="portfolio-app">
      <Navbar/>
      {isHomePage() && <Hero/>}
      <div className='container'>
        {children}
      </div>

      {/* FOOTER STARTS */}
      { isHomePage() &&
      <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
        <div className="container text-center">
          <small>Copyright &copy; Your Website</small>
        </div>
      </footer>
      }
      {/* FOOTER ENDS */}
    </div>
  )
}


export default BaseLayout;
