import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Camera,
  RotateCcw,
  Check,
  Upload,
  AlertTriangle,
  Sparkles,
  Send,
  RefreshCw,
  Sun,
  Maximize2,
  FileText,
} from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoCaptured: (dataUrl: string, autoSend?: boolean) => void;
  grade: number;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onPhotoCaptured,
  grade,
}) => {
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShutterFlashing, setIsShutterFlashing] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fallbackFileInputRef = useRef<HTMLInputElement>(null);

  // Subtle camera shutter click audio effect using Web Audio API
  const playShutterSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio not permitted or not supported
    }
  };

  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  const startCamera = useCallback(
    async (mode: 'environment' | 'user' = facingMode) => {
      setIsStartingCamera(true);
      setErrorMessage(null);
      setCapturedPhoto(null);
      stopCameraStream();

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMessage(
          'Live camera video is not supported directly in this browser. Please use the device photo selector below.'
        );
        setIsStartingCamera(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: mode },
            width: { ideal: 1920, min: 640 },
            height: { ideal: 1080, min: 480 },
          },
          audio: false,
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsStreaming(true);
        }
      } catch (err: any) {
        console.warn('Camera error:', err);
        // If ideal mode failed and was environment, try without constraint
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          streamRef.current = fallbackStream;
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            await videoRef.current.play();
            setIsStreaming(true);
          }
        } catch (fallbackErr: any) {
          if (err.name === 'NotAllowedError' || fallbackErr.name === 'NotAllowedError') {
            setErrorMessage(
              'Camera access was denied. Please allow camera permissions in your browser address bar, or use the device photo picker.'
            );
          } else {
            setErrorMessage(
              'Could not connect to a live camera stream. You can snap a photo using your device camera or upload from files.'
            );
          }
        }
      } finally {
        setIsStartingCamera(false);
      }
    },
    [facingMode, stopCameraStream]
  );

  // Initialize camera when modal opens
  useEffect(() => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      stopCameraStream();
      setCapturedPhoto(null);
      setErrorMessage(null);
    }
    return () => {
      stopCameraStream();
    };
  }, [isOpen, startCamera, facingMode, stopCameraStream]);

  // Flip camera between environment and user
  const handleFlipCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Snap photo from the live video element
  const handleSnapPhoto = () => {
    if (!videoRef.current) return;
    playShutterSound();
    setIsShutterFlashing(true);
    setTimeout(() => setIsShutterFlashing(false), 200);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const vw = video.videoWidth || 1280;
    const vh = video.videoHeight || 720;
    canvas.width = vw;
    canvas.height = vh;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, vw, vh);

    // Compress client-side to quality 0.85
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setCapturedPhoto(dataUrl);
    stopCameraStream();
  };

  // Retake photo: restart camera stream
  const handleRetake = () => {
    setCapturedPhoto(null);
    startCamera(facingMode);
  };

  // Confirm photo and return dataUrl
  const handleConfirmPhoto = (autoSend: boolean = false) => {
    if (!capturedPhoto) return;
    onPhotoCaptured(capturedPhoto, autoSend);
    onClose();
  };

  // Handle fallback file picker
  const handleFallbackFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setCapturedPhoto(compressed);
          stopCameraStream();
          setErrorMessage(null);
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      {/* Hidden input for native camera / file picker fallback */}
      <input
        ref={fallbackFileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFallbackFileSelect}
      />

      <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-4 py-3 bg-slate-800/90 text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-sm flex items-center gap-2">
                <span>Camera Capture</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Grade {grade} Homework
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Snap handwritten math, diagrams, or textbook questions for Zola
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Close camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder / Video Canvas Area */}
        <div className="relative flex-1 bg-black min-h-[300px] sm:min-h-[420px] flex items-center justify-center overflow-hidden">
          {/* Shutter Flash Animation */}
          {isShutterFlashing && (
            <div className="absolute inset-0 bg-white z-30 pointer-events-none transition-opacity duration-200"></div>
          )}

          {/* 1. Live Video Stream Viewfinder */}
          {!capturedPhoto && !errorMessage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover max-h-[60vh]"
              />

              {/* Document Alignment Overlay Box */}
              <div className="absolute inset-4 sm:inset-10 border-2 border-emerald-400/50 rounded-2xl pointer-events-none flex flex-col justify-between p-3 sm:p-4">
                <div className="flex justify-between">
                  <div className="w-7 h-7 border-t-4 border-l-4 border-amber-400 rounded-tl-lg"></div>
                  <div className="w-7 h-7 border-t-4 border-r-4 border-amber-400 rounded-tr-lg"></div>
                </div>

                <div className="self-center bg-black/60 backdrop-blur-xs text-white text-[11px] px-3.5 py-1.5 rounded-full border border-white/20 text-center font-medium shadow-md">
                  📄 Align handwritten problem or question in this frame
                </div>

                <div className="flex justify-between">
                  <div className="w-7 h-7 border-b-4 border-l-4 border-amber-400 rounded-bl-lg"></div>
                  <div className="w-7 h-7 border-b-4 border-r-4 border-amber-400 rounded-br-lg"></div>
                </div>
              </div>

              {/* Camera Starting Spinner */}
              {isStartingCamera && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white gap-2">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                  <span className="text-xs font-semibold">Starting camera stream...</span>
                </div>
              )}
            </div>
          )}

          {/* 2. Snapped Photo Preview */}
          {capturedPhoto && (
            <div className="relative w-full h-full flex items-center justify-center p-2 bg-slate-950">
              <img
                src={capturedPhoto}
                alt="Snapped Homework"
                className="max-w-full max-h-[58vh] object-contain rounded-2xl border border-emerald-500/50 shadow-2xl"
              />
              <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Check className="w-3.5 h-3.5" />
                <span>Photo Captured</span>
              </div>
            </div>
          )}

          {/* 3. Error / Permission Denied State */}
          {errorMessage && (
            <div className="p-6 text-center max-w-md space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">Camera Not Available</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{errorMessage}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
                <button
                  onClick={() => fallbackFileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span>Use Device Camera / Files</span>
                </button>
                <button
                  onClick={() => startCamera(facingMode)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Footer */}
        <div className="p-4 bg-slate-800/90 border-t border-slate-700/80">
          {!capturedPhoto ? (
            /* Live Camera Controls */
            <div className="flex items-center justify-between gap-4">
              {/* Fallback File button */}
              <button
                type="button"
                onClick={() => fallbackFileInputRef.current?.click()}
                className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                title="Select photo from files instead"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Choose File</span>
              </button>

              {/* Main Shutter Button */}
              <button
                type="button"
                onClick={handleSnapPhoto}
                disabled={!isStreaming || isStartingCamera}
                className="relative group p-1.5 rounded-full disabled:opacity-40 transition-transform active:scale-95"
                title="Click to snap photo"
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white flex items-center justify-center bg-white/20 group-hover:bg-white/30 transition-colors shadow-xl">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 group-hover:bg-emerald-400 flex items-center justify-center text-white shadow-inner">
                    <Camera className="w-6 h-6" />
                  </div>
                </div>
              </button>

              {/* Flip camera button */}
              <button
                type="button"
                onClick={handleFlipCamera}
                disabled={!isStreaming || isStartingCamera}
                className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                title="Flip to front / rear camera"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Flip Camera</span>
              </button>
            </div>
          ) : (
            /* Snapped Photo Review Controls */
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRetake}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Photo</span>
              </button>

              <div className="w-full sm:w-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleConfirmPhoto(false)}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-600 hover:bg-slate-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Attach to Question</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleConfirmPhoto(true)}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze with Zola</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
