import App from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/index.scss'

import Navbar from '@/components/shared/Navbar';
import Hero from "@/components/shared/Hero";


const MyApp = ({Component, pageProps}) => {

  return (
    <div className="portfolio-app">
      <Navbar/>
      {pageProps.appData}
      {Component.name === 'Home' && <Hero/>}
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

// getInitialProps 只在最上层调用
// 如果app调用了，那么portfolios中的getInitialProps就不会调用了
// MyApp.getInitialProps = async (context) => {
//   const initialProps = App.getInitialProps && await App.getInitialProps(context);
//   console.log(initialProps);
//   return {pageProps: {appData: 'hello _app Component', ...initialProps.pageProps}}
// }

export default MyApp;
