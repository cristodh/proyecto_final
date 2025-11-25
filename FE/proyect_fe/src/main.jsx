import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './routes/Routing'
import './styles/global.css'
import './styles/removeMarginGlobal.css'
import { ThemeProvider } from '@mui/material'
import theme from './Theme/theme'
import emailjs from "@emailjs/browser";


createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    {emailjs.init("0OCzD-TBNJGF09KlH")}
    <Routing />
  </ThemeProvider>,
)
