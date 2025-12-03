import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen relative">
        {/* Global Background Image with Overlay */}
        <div className="fixed inset-0 z-0">
          <img
            src="/assets/fitness_bg_custom.png"
            alt="Background"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        </div>

        <div className="relative z-10">
          <Component {...pageProps} />
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </AuthProvider>
  );
}
