import React, { useState } from 'react';
import { X, ExternalLink, Link as LinkIcon, Check } from 'lucide-react';
import { Language } from '../types';

interface ImagePreviewModalProps {
  isOpen: boolean;
  title: string;
  imageUrl: string;
  language: Language;
  onClose: () => void;
  onUpdateImage?: (newUrl: string) => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  title,
  imageUrl,
  language,
  onClose,
  onUpdateImage,
}) => {
  if (!isOpen) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(imageUrl);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl.trim() && onUpdateImage) {
      onUpdateImage(newUrl.trim());
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setIsEditing(false);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="min-w-0 pr-2">
            <h3 className="text-xs sm:text-sm font-semibold truncate text-slate-200">
              {title}
            </h3>
            <span className="text-[10px] font-mono text-slate-400 block truncate">
              {imageUrl}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onUpdateImage && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-blue-400 border border-slate-700 transition-colors"
              >
                {isEditing ? (language === 'fr' ? 'Annuler' : 'Cancel') : (language === 'fr' ? 'Modifier lien' : 'Edit link')}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Image Link Editor Dropdown */}
        {isEditing && (
          <form onSubmit={handleSave} className="p-3 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://... URL de la nouvelle image"
              required
              className="flex-1 px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold flex items-center justify-center gap-1"
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
              <span>{saved ? (language === 'fr' ? 'Enregistré' : 'Saved') : (language === 'fr' ? 'Appliquer' : 'Apply')}</span>
            </button>
          </form>
        )}

        {/* Image Area */}
        <div className="relative max-h-[70vh] flex items-center justify-center bg-black p-2">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-slate-400 text-xs font-mono">
          <span>{language === 'fr' ? 'Lien dynamique actif' : 'Active dynamic image link'}</span>
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>{language === 'fr' ? 'Ouvrir originale' : 'Open original'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
