import React, { useState } from 'react';
import { X, Volume2, Star, Sparkles, Heart, Award, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SpeechService } from '../services/speechService';

interface FoundationInteractiveWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  grade: number;
}

export const FoundationInteractiveWidget: React.FC<FoundationInteractiveWidgetProps> = ({
  isOpen,
  onClose,
  grade,
}) => {
  const [activeTab, setActiveTab] = useState<'counting' | 'phonics' | 'money'>('counting');
  const [stars, setStars] = useState(3);

  // Counting Game State
  const [animalCount, setAnimalCount] = useState(0);
  const targetCount = 6;

  // Phonics Game State
  const [selectedDigraph, setSelectedDigraph] = useState('sh');
  const [selectedEnding, setSelectedEnding] = useState('op');
  const [phonicsWordSpoken, setPhonicsWordSpoken] = useState(false);

  // Money Game State
  const [walletRands, setWalletRands] = useState(0);
  const itemPrice = 12; // R12 for fresh apples

  if (!isOpen) return null;

  // Audio helper
  const handleSpeak = (text: string) => {
    SpeechService.speak(text);
  };

  const celebrate = () => {
    setStars((s) => s + 1);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-amber-300 p-4 sm:p-6 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🦁</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-foundation">
                Grade {grade} Fun Zone!
              </h2>
              <p className="text-xs text-amber-800 font-bold">Tap, Listen & Learn with Big Smiles!</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-amber-200/70 px-3 py-1 rounded-full border border-amber-300 text-amber-900 font-black text-sm">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{stars} Stars!</span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Mode Tabs */}
        <div className="grid grid-cols-3 gap-2 my-3">
          <button
            onClick={() => {
              setActiveTab('counting');
              handleSpeak('Let us count the zebras in the Kruger National Park!');
            }}
            className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              activeTab === 'counting'
                ? 'bg-amber-500 text-white shadow-md scale-105'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <span>🦓 Count Zebras</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('phonics');
              handleSpeak('Phonics word builder! Tap sounds to make words.');
            }}
            className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              activeTab === 'phonics'
                ? 'bg-orange-500 text-white shadow-md scale-105'
                : 'bg-white text-orange-900 border border-orange-200 hover:bg-orange-100'
            }`}
          >
            <span>🔤 Phonics Sounds</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('money');
              handleSpeak('South African Rand coins! Tap coins to buy healthy apples.');
            }}
            className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              activeTab === 'money'
                ? 'bg-emerald-600 text-white shadow-md scale-105'
                : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <span>🪙 Rand Coins</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3 bg-white/80 rounded-2xl border-2 border-amber-200">
          {/* TAB 1: COUNTING ZEBRAS */}
          {activeTab === 'counting' && (
            <div className="text-center space-y-4 py-2">
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-800 font-foundation">
                  Can you count {targetCount} Zebras?
                </h3>
                <button
                  onClick={() => handleSpeak(`Tap the zebras until you count up to ${targetCount}!`)}
                  className="p-1 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm font-bold text-slate-600">
                You have counted: <span className="text-2xl font-black text-amber-600">{animalCount}</span> / {targetCount}
              </div>

              {/* Zebras Field */}
              <div className="flex flex-wrap items-center justify-center gap-3 py-4 min-h-[140px] bg-emerald-50 rounded-2xl border border-emerald-200">
                {Array.from({ length: animalCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSpeak(`Zebra number ${i + 1}!`)}
                    className="text-4xl sm:text-5xl transform hover:scale-125 transition-transform animate-in zoom-in"
                  >
                    🦓
                  </button>
                ))}
                {animalCount === 0 && (
                  <p className="text-xs font-bold text-slate-400">Tap "+ 1 Zebra" below to start counting!</p>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    if (animalCount < targetCount) {
                      const next = animalCount + 1;
                      setAnimalCount(next);
                      handleSpeak(`${next}`);
                      if (next === targetCount) {
                        celebrate();
                        setTimeout(() => {
                          handleSpeak(`Hooray! You counted all ${targetCount} zebras! You get a shiny gold star!`);
                        }, 500);
                      }
                    }
                  }}
                  disabled={animalCount >= targetCount}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-lg shadow-amber-500/30 disabled:opacity-50 transition-all transform active:scale-95"
                >
                  ➕ Add 1 Zebra!
                </button>
                <button
                  onClick={() => {
                    setAnimalCount(0);
                    handleSpeak('Let us count again from zero!');
                  }}
                  className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold"
                  title="Reset Counter"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {animalCount === targetCount && (
                <div className="p-3 bg-amber-100 border border-amber-300 rounded-2xl text-amber-900 font-black text-sm animate-bounce flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  <span>Brilliant job! You counted {targetCount} zebras!</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PHONICS BUILDER */}
          {activeTab === 'phonics' && (
            <div className="space-y-4 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-800 font-foundation">
                  Build South African Phonics Words
                </h3>
                <button
                  onClick={() => handleSpeak('Choose a starting sound and an ending sound to build a word!')}
                  className="p-1 rounded-full bg-orange-100 text-orange-800 hover:bg-orange-200"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Digraph Pickers */}
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1">1. Pick Starting Digraph:</div>
                <div className="flex justify-center gap-2">
                  {['sh', 'ch', 'th', 'wh'].map((digraph) => (
                    <button
                      key={digraph}
                      onClick={() => {
                        setSelectedDigraph(digraph);
                        handleSpeak(digraph);
                      }}
                      className={`px-4 py-2 rounded-xl font-black text-lg ${
                        selectedDigraph === digraph
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-orange-100 text-orange-950 hover:bg-orange-200'
                      }`}
                    >
                      {digraph}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ending Pickers */}
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1">2. Pick Word Ending:</div>
                <div className="flex justify-center gap-2">
                  {['op', 'ip', 'at', 'in', 'orn'].map((end) => (
                    <button
                      key={end}
                      onClick={() => {
                        setSelectedEnding(end);
                        handleSpeak(end);
                      }}
                      className={`px-4 py-2 rounded-xl font-black text-lg ${
                        selectedEnding === end
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-amber-100 text-amber-950 hover:bg-amber-200'
                      }`}
                    >
                      -{end}
                    </button>
                  ))}
                </div>
              </div>

              {/* Built Word Result */}
              <div className="py-4 bg-orange-50 rounded-2xl border-2 border-orange-200 flex flex-col items-center justify-center gap-2">
                <div className="text-xs font-bold text-orange-800 uppercase tracking-wider">Your Word:</div>
                <div className="text-4xl sm:text-5xl font-black text-orange-600 font-foundation tracking-wide">
                  <span className="text-orange-700">{selectedDigraph}</span>
                  <span className="text-amber-600">{selectedEnding}</span>
                </div>
                <button
                  onClick={() => {
                    const word = selectedDigraph + selectedEnding;
                    handleSpeak(word);
                    celebrate();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-md transition-transform active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen & Say "{selectedDigraph + selectedEnding}"</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SOUTH AFRICAN MONEY */}
          {activeTab === 'money' && (
            <div className="space-y-4 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-800 font-foundation">
                  Tuck Shop: Buy Apples for R{itemPrice}
                </h3>
                <button
                  onClick={() => handleSpeak(`The apples cost ${itemPrice} Rands. Tap the coins to pay exact money!`)}
                  className="p-1 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-around">
                <div>
                  <div className="text-xs font-bold text-emerald-800">Fresh Red Apples 🍎</div>
                  <div className="text-xl font-black text-emerald-700">R{itemPrice}</div>
                </div>
                <div className="h-8 w-px bg-emerald-200"></div>
                <div>
                  <div className="text-xs font-bold text-slate-600">Your Coin Jar</div>
                  <div className="text-xl font-black text-slate-900">R{walletRands}</div>
                </div>
              </div>

              {/* Coin Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { label: 'R1 Coin', val: 1, color: 'bg-slate-200 text-slate-800 border-slate-300' },
                  { label: 'R2 Coin', val: 2, color: 'bg-amber-100 text-amber-900 border-amber-300' },
                  { label: 'R5 Coin', val: 5, color: 'bg-yellow-200 text-yellow-950 border-yellow-400' },
                  { label: 'R10 Note', val: 10, color: 'bg-emerald-200 text-emerald-950 border-emerald-400' },
                ].map((coin) => (
                  <button
                    key={coin.val}
                    onClick={() => {
                      const next = walletRands + coin.val;
                      setWalletRands(next);
                      handleSpeak(`Added ${coin.val} Rand. Total is ${next} Rands.`);
                      if (next === itemPrice) {
                        celebrate();
                        setTimeout(() => {
                          handleSpeak('Perfect payment! Here are your delicious apples!');
                        }, 500);
                      }
                    }}
                    className={`px-4 py-3 rounded-2xl font-black text-sm border-2 shadow-sm hover:scale-105 transition-all ${coin.color}`}
                  >
                    + {coin.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setWalletRands(0);
                    handleSpeak('Resetting your coins.');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Empty Coin Jar
                </button>
              </div>

              {walletRands === itemPrice && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 font-black text-sm animate-bounce">
                  🎉 Fantastic! You paid exactly R{itemPrice}! You earn a Distinction star!
                </div>
              )}
              {walletRands > itemPrice && (
                <div className="p-2 bg-orange-100 border border-orange-200 rounded-xl text-orange-900 text-xs font-bold">
                  You have R{walletRands}! That is R{walletRands - itemPrice} change. Great counting!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer encouragement */}
        <div className="mt-3 pt-2 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900 font-bold">
          <span>South African CAPS Foundation Phase Fun</span>
          <button
            onClick={() => handleSpeak('You are doing great! Keep practicing everyday!')}
            className="text-amber-700 hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Cheer Me Up!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
