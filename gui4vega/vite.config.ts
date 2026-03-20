import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src'],
            insertTypesEntry: true,
            tsconfigPath: './tsconfig.app.json'
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Gui4VegaReact',
            fileName: 'index',
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'vega'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    vega: 'vega'
                }
            }
        }
    }
})
