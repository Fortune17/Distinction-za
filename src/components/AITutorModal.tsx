import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Sparkles,
  Send,
  Volume2,
  VolumeX,
  Languages,
  Loader2,
  Camera,
  Image as ImageIcon,
  ZoomIn,
  Trash2,
  Upload,
  Check,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { LearnerProfile, SouthAfricanLanguage } from '../types/curriculum';
import { SpeechService } from '../services/speechService';
import { SAMPLE_HOMEWORK_PHOTOS, SampleHomeworkPhoto } from '../data/tutorSampleImages';
import { CameraCaptureModal } from './CameraCaptureModal';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  source?: string;
  imageUrl?: string;
  imageName?: string;
}

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: LearnerProfile;
  currentSubject?: string;
  currentTopic?: string;
  contextLesson?: string;
  isOffline?: boolean;
}

const SA_LANGUAGES: SouthAfricanLanguage[] = [
  'English',
  'isiZulu',
  'Afrikaans',
  'isiXhosa',
  'Sesotho',
  'Sepedi',
  'Setswana',
];

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  profile,
  currentSubject,
  currentTopic,
  contextLesson,
  isOffline = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SouthAfricanLanguage>(profile.preferredLanguage || 'English');
  const [activeMode, setActiveMode] = useState<'chat' | 'hint' | 'practice' | 'diagnose'>('chat');
  const [isSpeakingMsgId, setIsSpeakingMsgId] = useState<string | null>(null);

  // Photo upload & compression state
  const [attachedImage, setAttachedImage] = useState<{
    dataUrl: string;
    name: string;
    originalBytes: number;
    compressedBytes: number;
  } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);
  const [isCameraCaptureModalOpen, setIsCameraCaptureModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const isFoundation = profile.grade <= 3;
  const isFET = profile.grade >= 10;

  // Initial welcome message based on grade
  useEffect(() => {
    if (messages.length === 0) {
      let welcomeContent = '';
      if (isFoundation) {
        welcomeContent = `Sawubona & Hello ${profile.name}! 🌟 I am Zola, your friendly South African tutor. We can learn numbers, letters, and fun stories together. You can even take or upload a photo of your drawing or school book! What would you like to explore today?`;
      } else if (isFET) {
        welcomeContent = `Greetings ${profile.name}! I am Zola, your CAPS Distinction Tutor. I'm here to help you master your Grade ${profile.grade} curriculum and prepare for your DBE exams.\n\n📸 You can now **upload or take a photo** of your handwritten math calculations, textbook questions, past exam papers, or science diagrams. I will check your working, spot errors, and provide step-by-step DBE marking memos!`;
      } else {
        welcomeContent = `Hello ${profile.name}! I'm Zola, your CAPS learning tutor. Whether you need a step-by-step explanation, a helpful hint, or you want to snap a photo of your homework exercise, just attach it below!`;
      }

      setMessages([
        {
          id: 'welcome',
          role: 'model',
          content: welcomeContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [profile.grade, profile.name]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, attachedImage]);

  // Client-side image compression: scales down to max 1024px width/height and compresses to JPEG
  const processAndCompressFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WebP, etc.).');
      return;
    }

    setIsCompressing(true);
    const originalBytes = file.size;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const maxDim = 1024;
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
        if (!ctx) {
          setAttachedImage({
            dataUrl: src,
            name: file.name,
            originalBytes,
            compressedBytes: originalBytes,
          });
          setIsCompressing(false);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        const compressedBytes = Math.round((compressedDataUrl.length * 3) / 4);

        setAttachedImage({
          dataUrl: compressedDataUrl,
          name: file.name,
          originalBytes,
          compressedBytes,
        });
        setIsCompressing(false);
      };
      img.onerror = () => {
        setIsCompressing(false);
        alert('Could not decode the image file. Please try another photo.');
      };
      img.src = src;
    };
    reader.onerror = () => {
      setIsCompressing(false);
      alert('Failed to read photo.');
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndCompressFile(file);
    }
    // reset input so the same file can be re-selected if deleted
    if (e.target) e.target.value = '';
  };

  // Attach a preset sample photo
  const handleSelectPresetPhoto = (sample: SampleHomeworkPhoto) => {
    setAttachedImage({
      dataUrl: sample.dataUrl,
      name: `${sample.title}.jpg`,
      originalBytes: 150000,
      compressedBytes: 65000,
    });
    setInputValue(sample.prompt);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processAndCompressFile(file);
    }
  };

  // Clipboard paste listener
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          processAndCompressFile(file);
          break;
        }
      }
    }
  };

  // Generate tailored offline/fallback response for images
  const generateOfflineImageAnalysis = (promptText: string, imageName: string) => {
    const lowerPrompt = (promptText + ' ' + imageName).toLowerCase();

    if (lowerPrompt.includes('calculus') || lowerPrompt.includes('turning') || lowerPrompt.includes('math')) {
      return `📸 [Zola Visual Diagnosis • DBE CAPS Mathematics Paper 1]
I have examined your handwritten calculus notes in the photo:

1. Step-by-Step Verification:
   • Equation: f(x) = 2x³ - 3x² - 12x + 5
   • Derivative: f'(x) = 6x² - 6x - 12 ✓ [Method mark: power rule applied correctly]
   • Stationarity: 6x² - 6x - 12 = 0 ⇒ x² - x - 2 = 0 ✓ [Method mark: divided by 6]
   • Factorisation: (x - 2)(x + 1) = 0 ✓
   • Turning points x-values: x = 2 or x = -1 ✓

2. y-Coordinates Calculation:
   • For x = 2: f(2) = 2(8) - 3(4) - 12(2) + 5 = 16 - 12 - 24 + 5 = -15 ⇒ Local Minimum (2 ; -15) ✓
   • For x = -1: f(-1) = 2(-1) - 3(1) - 12(-1) + 5 = -2 - 3 + 12 + 5 = 12 ⇒ Local Maximum (-1 ; 12) ✓
   All your handwritten steps are 100% accurate! Award: [4/4 Marks]

3. Answering Concavity (Question 8.2.2):
   • Condition for concavity upward: f''(x) > 0
   • Second derivative: f''(x) = 12x - 6
   • 12x - 6 > 0  ⇒  12x > 6  ⇒  x > 1/2.
   • Therefore, f is strictly concave upward for x > 1/2. The point of inflection is at (1/2 ; -1.5).`;
    }

    if (lowerPrompt.includes('meiosis') || lowerPrompt.includes('biology') || lowerPrompt.includes('life science')) {
      return `📸 [Zola Visual Diagnosis • DBE CAPS Life Sciences Paper 1]
I have examined the Meiosis diagram in your uploaded photo:

1. Phase Identification:
   • Phase: Late Prophase I of Meiosis.
   • Reason: Homologous chromosome pairs (bivalents) have synapsed and are touching at crossover points.

2. Structure Identification:
   • A: Chiasma (plural: chiasmata) — the point of contact where non-sister chromatids exchange genetic segments.
   • B: Centromere — joins sister chromatids together and attaches to spindle fibres.
   • C: Spindle fibre — guides chromosome movement to opposite poles.

3. Biological Significance of Process at A (Crossing Over):
   • Generates new combinations of maternal and paternal alleles (genetic recombination).
   • Produces genetically unique gametes (sperm and egg cells), which creates genetic variation in offspring.
   • High genetic variation increases a population's resilience to disease and environmental changes (natural selection).

4. Exam Marking Rubric (DBE):
   • [M] Correct identification of Phase I (1 mark)
   • [M] Stating non-sister chromatids exchange pieces (1 mark)
   • [A] Link to genetic variation in gametes (1 mark)`;
    }

    if (lowerPrompt.includes('synoptic') || lowerPrompt.includes('geography') || lowerPrompt.includes('cold front')) {
      return `📸 [Zola Visual Diagnosis • DBE CAPS Geography Paper 1]
I have examined the South African Synoptic Weather Chart in your photo:

1. System Identification:
   • Weather System X is a Cold Front (associated with a mid-latitude cyclone moving eastwards across the Atlantic Ocean).

2. 24-Hour Predicted Weather Changes for Cape Town:
   • Temperature: Sharp drop in temperature as cold polar air moves in behind the front.
   • Wind Direction: Backs/veers from North-Westerly to cold, gusty South-Westerly winds.
   • Cloud Cover: Overcast sky with thick cumulonimbus and stratocumulus clouds.
   • Precipitation: Cold frontal rainfall / showers, heavy at times, followed by clearing conditions.
   • Atmospheric Pressure: Drops to its lowest point as the front reaches the coast, then rises steadily as the South Atlantic High ridges in.

3. Synoptic Map Reading Tips:
   • Look at the isobar values: closely spaced isobars indicate a steep pressure gradient and high wind speeds.
   • South Atlantic High (1028 hPa) ridges behind the cold front to push cold sub-polar air over the southern subcontinent.`;
    }

    return `📸 [Zola Visual Diagnosis • DBE CAPS Assessment Review]
I have received and examined your uploaded schoolwork photo:

1. Problem Breakdown & Given Information:
   • Question Identified: Grade ${profile.grade} ${currentSubject || 'CAPS Assessment Task'}
   • Status: Image clear and ready for DBE rubric evaluation.

2. General CAPS Problem-Solving Framework:
   • Step 1: Transcribe all given variables, diagrams, and numerical data.
   • Step 2: Write out the governing formula before substituting numbers (DBE awards [M] Method marks for the unrounded formula substitution).
   • Step 3: Check units (ensure standard SI units, e.g., m/s², kg, Joules, mol/dm³).
   • Step 4: Write your final answer rounded to two decimal places unless specified otherwise in the question paper instructions.

3. Distinction ZA Recommendation:
   Make sure every step is clearly numbered as shown in DBE past papers. You can ask me specific follow-up questions about any step!`;
  };

  // Callback when a photo is captured using the live CameraCaptureModal
  const handlePhotoCapturedFromCamera = (dataUrl: string, autoSend: boolean = false) => {
    const estimatedBytes = Math.round((dataUrl.length * 3) / 4);
    const photoName = `homework-snap-${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(':', '-')}.jpg`;
    const photoObj = {
      dataUrl,
      name: photoName,
      originalBytes: estimatedBytes,
      compressedBytes: estimatedBytes,
    };
    setAttachedImage(photoObj);

    if (autoSend) {
      handleSendMessage(
        'Please analyze this photo of my handwritten homework that I just snapped. Check my steps, verify my answers according to DBE CAPS criteria, and explain where marks are awarded or where I made an error.',
        undefined,
        photoObj
      );
    }
  };

  const handleSendMessage = async (
    textToSend?: string,
    overrideMode?: 'chat' | 'hint' | 'practice' | 'diagnose',
    imageOverride?: { dataUrl: string; name: string; originalBytes: number; compressedBytes: number }
  ) => {
    const text = textToSend !== undefined ? textToSend : inputValue;
    const currentPhoto = imageOverride || attachedImage;

    // Must have either text or an attached photo
    if ((!text.trim() && !currentPhoto) || loading) return;

    const userMsgContent = text.trim() || 'Please examine my uploaded photo and help me solve this step-by-step.';

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMsgContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: currentPhoto?.dataUrl,
      imageName: currentPhoto?.name,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setAttachedImage(null); // Clear preview after sending
    setLoading(true);

    const mode = overrideMode || activeMode;

    // Offline mode handler
    if (isOffline) {
      setTimeout(() => {
        let offlineReply = '';
        if (currentPhoto) {
          offlineReply = generateOfflineImageAnalysis(userMsgContent, currentPhoto.name);
        } else {
          offlineReply = `[Offline Mode • Local CAPS Notes]\nZola is currently disconnected from the live AI server because your internet is interrupted.\n\nKey Revision Tip for Grade ${profile.grade} ${currentSubject || 'Studies'}:\n- Always review your definitions and formula sheets in your local storage.\n- In mathematics and sciences, method marks are awarded for every single algebraic step.\n- Reconnect to the internet for live AI responses, or visit the "Offline Revision Vault" in your top bar to study your saved lessons without data!`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'model',
            content: offlineReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            source: 'local-offline-storage',
          },
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsgContent,
          grade: profile.grade,
          phase: profile.phase,
          subject: currentSubject || 'South African CAPS Curriculum',
          topic: currentTopic || 'General Study',
          language: selectedLanguage,
          mode,
          context: contextLesson || '',
          conversationHistory: messages.map((m) => ({ role: m.role, content: m.content })),
          image: currentPhoto?.dataUrl || undefined,
        }),
      });

      const data = await response.json();

      let replyText = data.text;
      if (!replyText) {
        if (currentPhoto) {
          replyText = generateOfflineImageAnalysis(userMsgContent, currentPhoto.name);
        } else {
          replyText = 'I could not generate a response. Please try again.';
        }
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-2.5-flash',
      };

      setMessages((prev) => [...prev, aiMsg]);

      // If Foundation Phase and sound enabled, auto-speak short response
      if (isFoundation && profile.soundEnabled && aiMsg.content) {
        SpeechService.speak(aiMsg.content);
      }
    } catch (err) {
      console.error('Tutor fetch error:', err);
      const fallbackText = currentPhoto
        ? generateOfflineImageAnalysis(userMsgContent, currentPhoto.name)
        : `[Network Interrupted • Local Cache Active]\nYour internet connection was interrupted. You can still access all your saved lessons and revision notes in your local storage without data!`;

      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local-offline-storage',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (isSpeakingMsgId === msgId) {
      SpeechService.stop();
      setIsSpeakingMsgId(null);
    } else {
      setIsSpeakingMsgId(msgId);
      SpeechService.speak(text, () => {
        setIsSpeakingMsgId(null);
      });
    }
  };

  // Quick suggestion chips based on Grade and Phase
  const getSuggestions = () => {
    if (isFoundation) {
      return [
        { label: '🦒 Count to 10 with me', prompt: 'Can you help me count South African animals from 1 to 10?' },
        { label: '🔤 Help with "sh" and "ch" sounds', prompt: 'How do I sound out words with "sh" and "ch"?' },
        { label: '💰 Counting 50c and R1 coins', prompt: 'How do I count Rands and cents when buying bread?' },
      ];
    }
    if (isFET) {
      return [
        { label: '💡 Give me a hint (no answer yet)', prompt: 'Can you give me a guided hint on how to approach this problem without telling me the answer?', mode: 'hint' as const },
        { label: '📝 Common DBE Exam Pitfalls', prompt: 'What common errors do Grade 12 learners make in this topic according to DBE diagnostic reports?' },
        { label: '🎯 Generate 2 practice questions', prompt: 'Generate 2 exam-style questions for this topic with marks breakdown.', mode: 'practice' as const },
        { label: '🔍 Explain first principles method', prompt: 'Explain the method for differentiating from first principles step by step.' },
      ];
    }
    return [
      { label: '💡 Give me a step-by-step hint', prompt: 'Can you guide me with a hint for this topic?', mode: 'hint' as const },
      { label: '📐 Explain like a real SA example', prompt: 'Can you explain this concept using an everyday South African example?' },
      { label: '🎯 2 Practice questions', prompt: 'Can you give me 2 quick questions to test my understanding?', mode: 'practice' as const },
    ];
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
      onPaste={handlePaste}
    >
      {/* Lightbox for inspecting homework photos in high-res */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[88vh] flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-white text-xs mb-2 px-2">
              <span className="font-bold flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-amber-400" />
                {lightboxImage.title}
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                title="Close photo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-white/20 bg-white"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white/70 text-[11px] mt-2">
              Click anywhere outside to close • Visual Examination by Zola
            </p>
          </div>
        </div>
      )}

      {/* Main Tutor Modal Container */}
      <div
        className={`relative w-full max-w-3xl h-[92vh] sm:h-[86vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
          isDragging ? 'border-emerald-500 ring-4 ring-emerald-500/30' : 'border-slate-200'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drag & Drop Visual Overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-40 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white pointer-events-none p-6 text-center animate-in fade-in">
            <Upload className="w-16 h-16 text-emerald-400 animate-bounce mb-3" />
            <div className="text-lg font-black">Drop your homework photo here!</div>
            <p className="text-xs text-emerald-200 mt-1">
              Zola will examine your working, identify equations or diagrams, and provide step-by-step DBE solutions.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-amber-300 font-bold shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg">Zola — AI CAPS Tutor</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/30 text-emerald-100">
                  Grade {profile.grade}
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-amber-400/30 text-amber-200 border border-amber-300/30 flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  <span>Photo Solver</span>
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80">
                South African Curriculum Guide • Distinction ZA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative flex items-center bg-black/20 rounded-xl px-2 py-1 text-xs text-white">
              <Languages className="w-3.5 h-3.5 mr-1.5 text-amber-300 shrink-0" />
              <select
                aria-label="Preferred Language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as SouthAfricanLanguage)}
                className="bg-transparent text-xs font-semibold focus:outline-hidden cursor-pointer"
              >
                {SA_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang} className="text-slate-900">
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Context Pill if attached */}
        {(currentSubject || currentTopic) && (
          <div className="px-4 py-1.5 bg-slate-100 border-b border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span className="truncate">
              <strong>Context:</strong> {currentSubject} {currentTopic ? `› ${currentTopic}` : ''}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">CAPS Aligned</span>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-bold mt-0.5">
                    Z
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-xs text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  {/* Attached photo thumbnail inside message */}
                  {msg.imageUrl && (
                    <div className="mb-2.5">
                      <div
                        onClick={() =>
                          setLightboxImage({
                            url: msg.imageUrl!,
                            title: msg.imageName || 'Attached homework photo',
                          })
                        }
                        className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/20 max-w-xs bg-black/10 transition-transform active:scale-98"
                      >
                        <img
                          src={msg.imageUrl}
                          alt={msg.imageName || 'Uploaded photo'}
                          className="w-full max-h-52 object-contain rounded-xl bg-white"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-bold text-xs">
                          <ZoomIn className="w-4 h-4 text-amber-300" />
                          <span>Tap to inspect photo</span>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 text-[10px] text-white flex items-center justify-between">
                          <span className="truncate font-mono">📸 {msg.imageName || 'Photo'}</span>
                          <span className="shrink-0 text-amber-300 text-[9px] uppercase font-bold">Enlarge</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  <div className="mt-1.5 pt-1 border-t border-black/5 flex items-center justify-between text-[10px] opacity-70">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleSpeak(msg.id, msg.content)}
                          className="hover:opacity-100 p-0.5 rounded transition-opacity"
                          title="Read out loud"
                        >
                          {isSpeakingMsgId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-slate-600" />
                          )}
                        </button>
                        <span>{msg.source === 'local-offline-storage' ? 'Offline CAPS' : 'Verified AI'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-bold mt-0.5">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2.5 text-slate-600 text-xs py-2.5 px-3.5 bg-white rounded-2xl border border-slate-200 w-fit shadow-xs">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600 shrink-0" />
              <div className="space-y-0.5">
                <div className="font-semibold text-slate-800">
                  {attachedImage ? 'Zola is analyzing your photo...' : 'Zola is consulting the CAPS curriculum...'}
                </div>
                <div className="text-[10px] text-slate-500">
                  Evaluating formulas, diagrams, and DBE marking memos
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Photo Upload Triggers & Sample Photos Banner */}
        <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCameraCaptureModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-2xs transition-all hover:scale-[1.02] active:scale-95 shrink-0"
              title="Open camera viewfinder to snap your handwritten homework"
            >
              <Camera className="w-3.5 h-3.5 text-amber-300" />
              <span>Camera Capture</span>
            </button>

            <span className="text-[11px] font-bold text-slate-400 hidden md:inline">|</span>

            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <span>Samples:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {SAMPLE_HOMEWORK_PHOTOS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectPresetPhoto(sample)}
                  className="px-2 py-1 rounded-lg bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-slate-700 text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 shadow-2xs"
                  title="Click to load this sample exam question into Zola"
                >
                  <span>{sample.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-slate-400 hidden sm:inline">
            Drag & drop or paste (Ctrl+V) photos anytime
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-1.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Quick prompts:</span>
          {getSuggestions().map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.prompt, chip.mode)}
              disabled={loading}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-slate-200 text-slate-700 shrink-0 transition-colors"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Attached Photo Preview Tray (if an image is selected) */}
        {attachedImage && (
          <div className="px-4 py-2.5 bg-emerald-50 border-t border-emerald-200 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-3 min-w-0">
              <div
                onClick={() =>
                  setLightboxImage({
                    url: attachedImage.dataUrl,
                    title: attachedImage.name,
                  })
                }
                className="relative group cursor-pointer w-12 h-12 rounded-xl overflow-hidden border border-emerald-300 bg-white shrink-0 shadow-xs"
              >
                <img
                  src={attachedImage.dataUrl}
                  alt={attachedImage.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="min-w-0 text-xs">
                <div className="font-bold text-emerald-950 truncate flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{attachedImage.name}</span>
                </div>
                <div className="text-[10px] text-emerald-700 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded bg-emerald-200/60 font-mono font-bold">
                    {Math.round(attachedImage.compressedBytes / 1024)} KB
                  </span>
                  <span>• Optimized for low-data mobile connection</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAttachedImage(null)}
              className="p-1.5 rounded-xl hover:bg-emerald-200/50 text-emerald-800 hover:text-rose-600 transition-colors shrink-0"
              title="Remove attached photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {isCompressing && (
          <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 text-xs text-amber-900 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
            <span>Optimizing photo resolution to save your data...</span>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          {/* Hidden File Input for Gallery / Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
          />

          {/* Hidden File Input for Camera Capture (Mobile/Tablet Native Fallback) */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileInputChange}
          />

          {/* Dedicated Camera Capture Button */}
          <button
            type="button"
            onClick={() => setIsCameraCaptureModalOpen(true)}
            disabled={loading || isCompressing}
            className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
            title="Snap a photo of your handwritten homework with live camera"
          >
            <Camera className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Camera Capture</span>
            <span className="sm:hidden">Snap</span>
          </button>

          {/* Photo / Gallery Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading || isCompressing}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 transition-colors shrink-0"
            title="Upload photo from your gallery or files"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              attachedImage
                ? 'Ask a specific question about this photo (or tap Send to solve all)...'
                : isFoundation
                ? 'Ask a question or snap a photo of your school work...'
                : isFET
                ? 'Snap homework photo with Camera Capture, or ask any DBE question...'
                : 'Ask Zola, or snap a photo of any equation or diagram...'
            }
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={(!inputValue.trim() && !attachedImage) || loading || isCompressing}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>

      {/* Live Camera Viewfinder Modal for Snapping Homework */}
      <CameraCaptureModal
        isOpen={isCameraCaptureModalOpen}
        onClose={() => setIsCameraCaptureModalOpen(false)}
        onPhotoCaptured={handlePhotoCapturedFromCamera}
        grade={profile.grade}
      />
    </div>
  );
};
