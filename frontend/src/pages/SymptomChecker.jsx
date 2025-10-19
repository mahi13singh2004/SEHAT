import React, { useEffect, useState } from 'react'
import { useAiStore } from '../store/ai.store.js'
import symptom from "../assets/symptom.jpg"

const SymptomChecker = () => {
  const [prompt, setPrompt] = useState("")
  const { fetchSymptom, loading, response, err, clearResponse } = useAiStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetchSymptom(prompt)
    setPrompt("")
  }

  useEffect(() => {
    return () => {
      clearResponse()
    }
  }, [])

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-6 px-2 md:px-6 overflow-y-visible">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
        <div className="md:w-4/5 w-full flex flex-col gap-6 md:gap-8 bg-slate-900/70 border border-slate-800 rounded-3xl shadow-2xl p-4 md:p-8 lg:p-14 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-2 text-center tracking-tight">CareMate</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your ailment or symptoms or whatever you want to talk about"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 text-base md:text-lg shadow-sm"
              disabled={loading}
            />
            <button
              disabled={loading || !prompt}
              type="submit"
              className="px-8 py-3 rounded-xl bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold text-base md:text-lg transition-colors duration-200 disabled:opacity-60 shadow"
            >
              {loading ? "Checking..." : "Submit"}
            </button>
          </form>
          {err && <p className="text-red-400 text-center md:text-left font-semibold">{err}</p>}
          {response && (
            <div className="mt-2 bg-slate-800/70 border border-slate-700 rounded-2xl p-4 md:p-6 shadow">
              <p className="text-slate-200 font-semibold whitespace-pre-line text-base leading-relaxed">
                {response.replace(/\*\*/g, "")}
              </p>
            </div>
          )}
        </div>
        <div className="md:w-1/5 w-full flex flex-col items-center gap-4 md:gap-6 mt-6 md:mt-0">
          <div className="w-full bg-slate-900/70 border border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col items-center">
            <img src={symptom} alt="Symptom Checker" className="w-full h-40 md:h-56 object-cover rounded-t-3xl" />
          </div>
          <div className="w-full bg-slate-800/70 border-l-4 border-amber-500 rounded-2xl p-4 md:p-5 shadow flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f59e0b" className="w-8 h-8 md:w-10 md:h-10 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M2.25 19.5l9.02-15.02a1.5 1.5 0 012.46 0l9.02 15.02A1.5 1.5 0 0121.02 21H2.98a1.5 1.5 0 01-1.29-2.25z" />
            </svg>
            <span className="text-amber-200 font-semibold text-center text-xs md:text-base">This is an AI-generated response.<br />Do not fully rely on it; always consult a doctor.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymptomChecker