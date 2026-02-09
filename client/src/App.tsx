import './App.css'
import EventSourcing from './components/EventSourcing/EventSourcing'
import Longpulling from './components/Longpulling/Longpulling'

function App() {

  return (
    <>
      <h1>Longpulling</h1>
      <Longpulling/>
      <h2>Event sourcing</h2>
      <EventSourcing/>
    </>
  )
}

export default App
