import React, { useState } from 'react';
import { X, Image as ImageIcon, Link as LinkIcon, Code2, Sparkles, Check, RotateCcw } from 'lucide-react';
import { Language } from '../types';

interface DynamicImageModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  currentAvatar: string;
  onUpdateAvatar: (url: string) => void;
  currentCertImage: string;
  onUpdateCertImage: (url: string) => void;
  onResetImages: () => void;
}

export const DynamicImageModal: React.FC<DynamicImageModalProps> = ({
  isOpen,
  language,
  onClose,
  currentAvatar,
  onUpdateAvatar,
  currentCertImage,
  onUpdateCertImage,
  onResetImages,
}) => {
  if (!isOpen) return null;

  const [rawInput, setRawInput] = useState('');
  const [targetSlot, setTargetSlot] = useState<'avatar' | 'cert'>('avatar');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Helper to parse image URL from HTML <img src="..."> or plain URL
  const extractImageUrl = (text: string): string => {
    const trimmed = text.trim();
    // Check if HTML img tag
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
    const match = trimmed.match(imgRegex);
    if (match && match[1]) {
      return match[1];
    }
    // Check if plain url
    return trimmed;
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const extracted = extractImageUrl(rawInput);
    if (!extracted) return;

    if (targetSlot === 'avatar') {
      onUpdateAvatar(extracted);
      setFeedback(
        language === 'fr'
          ? 'Avatar mis à jour dynamiquement !'
          : 'Avatar dynamically updated!'
      );
    } else {
      onUpdateCertImage(extracted);
      setFeedback(
        language === 'fr'
          ? 'Bannière de certification mise à jour !'
          : 'Certification banner updated!'
      );
    }

    setTimeout(() => setFeedback(null), 3000);
    setRawInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-[#2563eb]/20 flex items-center justify-center text-[#2563eb]">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0b1c30]">
                {language === 'fr' ? 'Studio d’Images Dynamiques' : 'Dynamic Image Link Studio'}
              </h3>
              <p className="text-xs font-mono text-[#565e74]">
                {language === 'fr' ? 'Lier des images depuis HTML ou URL' : 'Link images from HTML or direct URLs'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f4f7fc] hover:bg-[#e5eeff] text-[#565e74] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-[#2563eb]/20 text-xs text-[#565e74] space-y-1">
            <p className="font-semibold text-[#2563eb] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'fr' ? 'Extraction dynamique automatique' : 'Automatic Dynamic Parsing'}
            </p>
            <p>
              {language === 'fr'
                ? 'Collez directement une balise HTML (ex: <img src="https://..." />) ou une URL d’image. L’application extrait automatiquement l’attribut src et rafraîchit l’interface en temps réel.'
                : 'Paste directly an HTML snippet (e.g. <img src="https://..." />) or raw URL. The app parses the src attribute and updates the UI live.'}
            </p>
          </div>

          {/* Slot selector */}
          <div>
            <label className="block text-xs font-mono font-semibold text-[#0b1c30] mb-1.5">
              {language === 'fr' ? 'Élément cible à modifier :' : 'Target element to modify:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTargetSlot('avatar')}
                className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                  targetSlot === 'avatar'
                    ? 'border-[#2563eb] bg-blue-50/70 text-[#2563eb] font-bold shadow-2xs'
                    : 'border-[#c3c6d7]/40 text-[#565e74] hover:bg-[#f4f7fc]'
                }`}
              >
                <img
                  src={currentAvatar}
                  alt="Avatar"
                  className="w-6 h-6 rounded-full object-cover border"
                />
                <span>{language === 'fr' ? 'Photo de profil' : 'Profile Portrait'}</span>
              </button>

              <button
                type="button"
                onClick={() => setTargetSlot('cert')}
                className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                  targetSlot === 'cert'
                    ? 'border-[#2563eb] bg-blue-50/70 text-[#2563eb] font-bold shadow-2xs'
                    : 'border-[#c3c6d7]/40 text-[#565e74] hover:bg-[#f4f7fc]'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-[#2563eb]" />
                <span>{language === 'fr' ? 'Bannière Certif.' : 'Cert. Banner'}</span>
              </button>
            </div>
          </div>

          {/* Input form */}
          <form onSubmit={handleApply} className="space-y-3">
            <div>
              <label className="block text-xs font-mono font-semibold text-[#0b1c30] mb-1">
                {language === 'fr'
                  ? 'Code HTML <img ...> ou URL directe :'
                  : 'HTML <img> tag or Direct URL:'}
              </label>
              <textarea
                rows={3}
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder='<img src="https://..." /> ou https://site.com/image.png'
                required
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#c3c6d7]/60 text-xs font-mono text-[#0b1c30] focus:border-[#2563eb] focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 shadow-xs transition-all"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'Lier dynamiquement' : 'Link Dynamically'}</span>
              </button>

              <button
                type="button"
                onClick={onResetImages}
                className="px-3 py-2 text-xs font-mono text-[#565e74] hover:text-[#ba1a1a] hover:bg-red-50 rounded-lg flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'Réinitialiser' : 'Reset defaults'}</span>
              </button>
            </div>

            {feedback && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{feedback}</span>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#f4f7fc] border-t border-[#e5eeff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-[#c3c6d7]/50 text-xs font-mono text-[#0b1c30] hover:bg-[#e5eeff] transition-colors"
          >
            {language === 'fr' ? 'Fermer' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
