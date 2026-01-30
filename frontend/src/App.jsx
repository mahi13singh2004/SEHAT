import { useEffect, useState } from 'react'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientDashboard from './pages/PatientDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SelectRole from './pages/SelectRole'
import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/auth.store.js'
import Home from './pages/Home'
import DoctorOnly from './components/DoctorOnly'
import PatientOnly from './components/PatientOnly'
import Navbar from './components/Navbar'
import BookAppointment from './pages/BookAppointment'
import TimeSlot from './pages/TimeSlot.jsx'
import ConfirmPage from './pages/ConfirmPage.jsx'
import RestrictedRoute from './components/RestrictedRoute.jsx'
import SymptomChecker from './pages/SymptomChecker.jsx'
import VaultPage from './pages/VaultPage.jsx'
import SehatPal from './pages/SehatPal.jsx'
import TherapistFinder from './pages/TherapistFinder.jsx'
import BackendWakeupLoader from './components/BackendWakeupLoader.jsx'

const App = () => {
  const { checkAuth, loading } = useAuthStore()
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    const initializeApp = async () => {
      await checkAuth()
      setInitialLoad(false)
    }
    initializeApp()
  }, [checkAuth])

  // Show loading screen during initial backend wakeup
  if (initialLoad && loading) {
    return <BackendWakeupLoader />
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/select" element={<RestrictedRoute><SelectRole /></RestrictedRoute>} />
        <Route path="/signup/:role" element={<RestrictedRoute><Signup /></RestrictedRoute>} />
        <Route path="/login" element={<RestrictedRoute><Login /></RestrictedRoute>} />
        <Route path="/doctor/dashboard" element={<DoctorOnly><DoctorDashboard /></DoctorOnly>} />
        <Route path="/patient/dashboard" element={<PatientOnly><PatientDashboard /></PatientOnly>} />
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<RestrictedRoute><BookAppointment /></RestrictedRoute>} />
        <Route path="/time-slot" element={<TimeSlot />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/symptom" element={<SymptomChecker />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/sehatpal" element={<SehatPal />} />
        <Route path="/therapist-finder" element={<TherapistFinder />} />
      </Routes>
    </>
  )
}

export default App
