import React from 'react'
import Predict from './components/predict'

const App = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-blue-200">
      <p className="text-5xl text-blue-900 font-bold my-20">Titanic Survival Predictor</p>
      <Predict/>
    </div>
  )
}

export default App

