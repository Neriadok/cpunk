import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Opcional: Configura la carpeta de salida si no quieres 'dist'
  // build: {
  //   outDir: 'build'
  // }
})
