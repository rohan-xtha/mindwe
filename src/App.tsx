/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Therapy from "./pages/Therapy";
import Chat from "./pages/Chat";
import Professionals from "./pages/Professionals";
import Wellness from "./pages/Wellness";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F4F5F0] font-sans text-[#4A4F3D] selection:bg-[#5A5A40]/20 relative overflow-x-hidden">
        {/* Soft, calming, ambient background gradients */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#E2E8DD] blur-[120px] opacity-70 mix-blend-multiply transition-colors duration-1000" />
          <div className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#EAE4D9] blur-[120px] opacity-70 mix-blend-multiply transition-colors duration-1000" />
          <div className="absolute bottom-[-20%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#E5E7E0] blur-[140px] opacity-60 mix-blend-multiply transition-colors duration-1000" />
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/therapy" element={<Therapy />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/professionals" element={<Professionals />} />
              <Route path="/wellness" element={<Wellness />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
