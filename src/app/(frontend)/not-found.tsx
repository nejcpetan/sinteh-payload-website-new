"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [scannerPosition, setScannerPosition] = useState(0);
  const [scannerDirection, setScannerDirection] = useState(1); // 1 for right, -1 for left
  const [isScanning] = useState(true); // Always scanning in this version
  const [currentTime, setCurrentTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Ensure client-side only rendering for dynamic content
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date().toLocaleTimeString());
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Animated scanner effect - back and forth
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setScannerPosition((prev) => {
        const newPosition = prev + (scannerDirection * 2);
        
        // Change direction when reaching edges
        if (newPosition >= 95) {
          setScannerDirection(-1);
          return 95;
        } else if (newPosition <= 5) {
          setScannerDirection(1);
          return 5;
        }
        
        return newPosition;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [mounted, scannerDirection]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background industrial pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(107,196,65,0.1)_25%,rgba(107,196,65,0.1)_50%,transparent_50%,transparent_75%,rgba(107,196,65,0.1)_75%)] bg-[length:60px_60px]"></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 border-2 border-brand/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 border-2 border-brand/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-8 h-2 bg-brand/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-2 h-8 bg-brand/20 animate-pulse"></div>
        <div className="absolute top-60 left-1/3 w-3 h-3 border border-brand/25 rotate-12 animate-spin"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto container-px">
        {/* Main Error Display */}
        <div className="mb-12">
          {/* Industrial-style error code display */}
          <div className="relative mx-auto mb-8 max-w-lg">
            {/* Monitor/Screen Effect */}
            <div className="bg-surface border-4 border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {/* Screen scanlines effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(107,196,65,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
              
              {/* Error Code */}
              <div className="font-mono text-6xl md:text-8xl font-bold text-foreground mb-4 relative">
                <span className="relative">
                  404
                  {/* Glitch effect overlay */}
                  <span className="absolute inset-0 text-brand opacity-20 animate-pulse">404</span>
                </span>
              </div>
              
              {/* Status indicator */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="font-mono text-sm text-foreground/70 uppercase tracking-widest">
                  System Error
                </div>
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              </div>
              
              {/* Barcode Scanner Animation */}
              <div className="relative mx-auto w-48 h-16 bg-white border-2 border-border/60 rounded-lg overflow-hidden mb-4">
                {/* Barcode pattern - static widths to prevent hydration mismatch */}
                <div className="absolute inset-2 flex items-center justify-center gap-px">
                  {[2, 1, 3, 2, 1, 4, 2, 3, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2].map((width, i) => (
                    <div
                      key={i}
                      className="bg-foreground h-full opacity-80"
                      style={{
                        width: `${width}px`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Scanner laser line */}
                {mounted && isScanning && (
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-brand shadow-lg shadow-brand/50 transition-all duration-75 ease-linear"
                    style={{
                      left: `${scannerPosition}%`,
                      boxShadow: `0 0 10px #5fb83b`,
                    }}
                  />
                )}
              </div>
              
              <div className="font-mono text-xs text-foreground/60 uppercase tracking-wide">
                {mounted ? (isScanning ? "Scanning..." : "Scan Failed") : "Initializing..."}
              </div>
            </div>
          </div>

          {/* Error Messages */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sistem ni mogel najti zahtevane strani
          </h1>
          
          <p className="text-lg text-foreground/70 mb-2">
            Krmilnik poroča o napaki v komunikacijski povezavi
          </p>
          
          <p className="text-sm text-foreground/60 font-mono">
            ERROR_CODE: PAGE_NOT_FOUND | STATUS: DISCONNECTED | TIME: {mounted ? currentTime : "--:--:--"}
          </p>
        </div>

        {/* Industrial Control Panel Style Navigation */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Link href="/" className="group">
            <div className="bg-surface border-2 border-border hover:border-brand/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-brand">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </div>
              <div className="font-semibold text-foreground text-sm">Domov</div>
              <div className="text-xs text-foreground/60 mt-1">Glavni krmilnik</div>
            </div>
          </Link>

          <Link href="/products" className="group">
            <div className="bg-surface border-2 border-border hover:border-brand/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-brand">
                  <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="font-semibold text-foreground text-sm">Produkti</div>
              <div className="text-xs text-foreground/60 mt-1">Varnostni sistemi</div>
            </div>
          </Link>

          <Link href="#kontakt" className="group">
            <div className="bg-surface border-2 border-border hover:border-brand/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-brand">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="font-semibold text-foreground text-sm">Kontakt</div>
              <div className="text-xs text-foreground/60 mt-1">Tehnična podpora</div>
            </div>
          </Link>

          <button 
            onClick={() => window.history.back()} 
            className="group"
          >
            <div className="bg-surface border-2 border-border hover:border-brand/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-brand">
                  <path d="M19 12H6m6-7l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="font-semibold text-foreground text-sm">Nazaj</div>
              <div className="text-xs text-foreground/60 mt-1">Prejšnja stran</div>
            </div>
          </button>
        </div>

        {/* System Status Panel */}
        <div className="bg-surface border-2 border-border rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-brand animate-pulse"></div>
            Sistemsko stanje
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-mono text-brand font-bold">ONLINE</div>
              <div className="text-foreground/60">Glavni sistem</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-brand font-bold">ACTIVE</div>
              <div className="text-foreground/60">Varnostni protokoli</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-yellow-600 font-bold">WARNING</div>
              <div className="text-foreground/60">Povezava prekinjena</div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border/50">
            <p className="text-xs text-foreground/60 font-mono text-center">
              SINTEH PRO © 2024 | SYSTEM_ID: SPR-001 | UPTIME: 99.9%
            </p>
          </div>
        </div>

        {/* Emergency contact */}
        <div className="mt-8">
          <p className="text-sm text-foreground/70 mb-4">
            Potrebujete takojšnjo tehnično podporo?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" size="lg" asChild>
              <a href="tel:+38634263646" className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Pokličite: +386 (3) 426 36 46
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:info@sinteh.pro" className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                E-pošta
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
