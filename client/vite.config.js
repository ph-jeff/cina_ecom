import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// for prod
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})

// for dev / local hosting
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { networkInterfaces } from 'os';

// const getLocalIpAddress = () => {
//     const interfaces = networkInterfaces();
//     let ipAddress = '';

//     // Iterate over network interfaces
//     for (const key in interfaces) {
//         for (const iface of interfaces[key] || []) {
//             // Check for IPv4 addresses and skip internal (non-public) addresses
//             if (iface.family === 'IPv4' && !iface.internal) {
//                 ipAddress = iface.address;
//                 break;
//             }
//         }
//         if (ipAddress) {
//             break;
//         }
//     }

//     return ipAddress;
// };

// const localIpAddress = getLocalIpAddress();

// export default defineConfig({
//     plugins: [react()],
//     server: {
//         host: localIpAddress || 'localhost',
//         port: 3000,
//     },
// });