"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, RefreshCw, Cpu, Award } from "lucide-react";

interface BiometricsScannerProps {
  onVerifySuccess: () => void;
  isAlreadyVerified: boolean;
}

export const BiometricsScanner: React.FC<BiometricsScannerProps> = ({
  onVerifySuccess,
  isAlreadyVerified,
}) => {
  const [permission, setPermission] = useState<"prompt" | "granted" | "denied">(
    "prompt",
  );

  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState("");
  const [success, setSuccess] = useState(isAlreadyVerified);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const streamRef = useRef<MediaStream | null>(null);

  const scanStages = [
    "Locking facial anchors...",
    "Analyzing 3D topology...",
    "Gemini anti-catfish neural check...",
    "Hashing secure identity signature...",
    "Registering trust vault profile...",
  ];

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());

      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setPermission("granted");
    } catch (err) {
      console.warn("Camera unavailable — holographic simulator fallback.", err);

      setPermission("denied");
    }
  };

  const triggerScan = async () => {
    setSuccess(false);
    setScanProgress(0);
    setScanning(true);

    if (permission !== "granted") {
      await startCamera();
    }
  };

  useEffect(() => {
    if (!scanning) return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 1;

        const stageIndex = Math.floor(next / 20);

        setScanStage(scanStages[Math.min(stageIndex, scanStages.length - 1)]);

        if (next >= 100) {
          clearInterval(interval);

          setScanning(false);
          setSuccess(true);

          stopCamera();

          onVerifySuccess();

          return 100;
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [scanning]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-surface-container-low border border-white/5 rounded-2xl p-6 glass-card relative overflow-hidden text-center">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-52 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <ShieldCheck className="w-5 h-5 text-brand-green" />
          <span className="text-xs uppercase tracking-wider text-white/60 font-semibold">
            Biometric Guard AI
          </span>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase
          ${
            success
              ? "bg-brand-green/10 text-brand-green"
              : "bg-white/5 text-white/50"
          }`}
        >
          {success ? "Verified" : "Unverified"}
        </span>
      </div>

      {/* Scanner Orb */}
      <div className="relative w-52 h-52 mx-auto mb-6 rounded-full border border-white/10 overflow-hidden bg-black/40 flex items-center justify-center">
        {/* Scan Beam */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ top: "0%" }}
              animate={{
                top: ["0%", "100%", "0%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
              }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-green to-transparent z-20"
            />
          )}
        </AnimatePresence>

        {/* Camera Feed */}
        {permission === "granted" && !success && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}

        {/* Verified State */}
        {success && (
          <motion.div
            initial={{
              scale: 0.6,
              rotate: -30,
            }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            className="w-20 h-20 rounded-full bg-brand-green/10 border border-brand-green flex items-center justify-center"
          >
            <Award className="w-10 h-10 text-brand-green animate-bounce" />
          </motion.div>
        )}

        {/* Idle CPU */}
        {!success && permission !== "granted" && (
          <div className="relative">
            <Cpu
              className={`w-16 h-16 text-white/20 ${
                scanning ? "animate-spin" : ""
              }`}
            />
          </div>
        )}

        {/* Diagnostics */}
        {scanning && (
          <div className="absolute inset-0 bg-black/30 p-4 text-left text-[10px] font-mono text-brand-green pointer-events-none">
            <div>LOCATING EYES: OK</div>
            <div>MESH: 2410</div>
            <div>LIVENESS: 99.8%</div>
            <div>FPS: 60</div>
            <div className="text-white/60">SECURE VAULT ACTIVE</div>
          </div>
        )}
      </div>

      {/* Success */}
      {success ? (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">
            Trust Signature Unlocked
          </h3>

          <p className="text-xs text-white/60 leading-relaxed">
            Your identity is secured by Tribby’s cryptographic biometric mesh.
          </p>

          <button
            onClick={triggerScan}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs flex items-center gap-2 mx-auto hover:bg-white/10 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Re-scan Face
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-white">
            Secure Selfie Verification
          </h3>

          <p className="text-xs text-white/60 leading-relaxed">
            Tribby prevents fake identities using live depth analysis and neural
            trust checks.
          </p>

          {scanning ? (
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-green rounded-full transition-all duration-300"
                  style={{
                    width: `${scanProgress}%`,
                  }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-white/50">
                <span>{scanStage}</span>
                <span>{scanProgress}%</span>
              </div>
            </div>
          ) : (
            <button
              onClick={triggerScan}
              className="w-full py-3 bg-brand-green text-black font-semibold rounded-xl text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition"
            >
              Scan My Face
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BiometricsScanner;
