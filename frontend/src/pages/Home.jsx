import header from "../assets/header.jpg"
import feature1 from "../assets/feature1.jpg"
import feature4 from "../assets/feature4.jpg"
import feature6 from "../assets/feature6.jpg"
import bot1 from "../assets/bot1.jpg"
import therapist from "../assets/therapist.jpg"
import { Link } from 'react-router-dom'


const Home = () => {
  const features = [
    { img: feature1, title: 'Appointment Booking', desc: 'Book appointments effortlessly with top doctors.', route: '/book' },
    { img: feature4, title: 'Sehat Vault', desc: 'Securely store and access your medical records.', route: '/vault' },
    { img: feature6, title: 'CareMate', desc: 'AI-assisted healthcare guidance at your fingertips.', route: '/symptom' },
    { img: bot1, title: 'SehatPal', desc: 'AI-powered nutrition coach for personalized diet plans.', route: '/sehatpal' },
    { img: therapist, title: 'Therapist Finder', desc: 'Find qualified therapists near you with ease.', route: '/therapist-finder' }
  ]

  return (
    <>
      <div className='w-full min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100'>

        <section className='w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 px-4 md:px-12 py-10 md:py-14'>
          <div className='w-full md:w-7/12'>
            <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight'>Care that meets you where you are</h1>
            <p className='text-slate-300 mt-4 text-base md:text-lg max-w-2xl'>SEHAT brings appointments, records, and guidance together—so you can focus on feeling better, not managing apps.</p>
            <div className='mt-7 flex flex-wrap gap-3'>
              <Link to='/book' className='px-5 py-3 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold'>Book appointment</Link>
              <Link to='/symptom' className='px-5 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold'>Ask CareMate</Link>
            </div>
          </div>
          <div className='w-full md:w-5/12 rounded-xl overflow-hidden border border-slate-800 shadow-xl'>
            <img className='w-full h-[280px] md:h-[400px] object-cover' src={header} alt='Healthcare' />
          </div>
        </section>


        <section className='px-4 md:px-12 py-12 md:py-16'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-100 mb-4'>Powerful Features</h2>
            <p className='text-slate-300 text-lg max-w-2xl mx-auto'>Everything you need to interact with your healthcare intelligently</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
            {features.map((feature, index) => (
              <Link to={feature.route} key={index} className='block group'>
                <div className='bg-slate-900/70 border border-slate-800 hover:bg-slate-900/90 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
                  <div className='w-16 h-16 rounded-xl overflow-hidden mb-6 border border-slate-700'>
                    <img src={feature.img} alt={feature.title} className='w-full h-full object-cover' />
                  </div>
                  <h3 className='text-xl font-semibold text-slate-100 mb-3'>{feature.title}</h3>
                  <p className='text-slate-400 leading-relaxed'>{feature.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>


        <section className='px-4 md:px-12 pb-12'>
          <div className='bg-slate-900/70 border border-slate-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4'>
            <div>
              <div className='text-xl md:text-2xl font-bold'>Ready to take control of your health?</div>
              <div className='text-slate-400 text-sm md:text-base'>Join SEHAT and get seamless, secure care today.</div>
            </div>
            <Link to='/select' className='px-5 py-3 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold'>Get started</Link>
          </div>
        </section>

        <footer className='px-4 md:px-12 py-8 border-t border-slate-800 text-slate-400'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-2'>
            <div className='font-bold text-slate-200'>SEHAT</div>
            <div className='text-xs'>&copy; {new Date().getFullYear()} SEHAT. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
