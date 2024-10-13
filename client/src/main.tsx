import { StrictMode } from 'react'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/index.ts'
import { AuthProvider } from './context/AuthContext.tsx'
import ReactDOM from 'react-dom/client';
const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
// const config = {
//   initialColorMode: "light", // Set default color mode to light
//   useSystemColorMode: false, // Do not switch based on system color mode
// };
// const theme = extendTheme({ config });

root.render(
  <StrictMode>
    <AuthProvider>
    <ChakraProvider theme={theme} >
      <App />
    </ChakraProvider>
    </AuthProvider>
  </StrictMode>,
)