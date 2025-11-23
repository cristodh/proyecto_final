import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './routes/Routing'
import './styles/removeMarginGlobal.css'
import { ThemeProvider } from '@mui/material'
import theme from './Theme/theme'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <Routing />
  </ThemeProvider>,
)
