import '@/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { Toaster as SonnerToaster } from '@/components/ui/sonner.tsx'
import { Toaster as RadixUiToaster } from '@/components/ui/toaster.tsx'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <RadixUiToaster />
    <SonnerToaster richColors position="top-right" />
  </React.StrictMode>,
)
