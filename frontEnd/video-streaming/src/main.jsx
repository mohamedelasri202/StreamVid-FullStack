import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { VideoProvider } from './context/VideoContext' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap App with VideoProvider */}
    <VideoProvider>
      <App />
    </VideoProvider>
  </StrictMode>,
)