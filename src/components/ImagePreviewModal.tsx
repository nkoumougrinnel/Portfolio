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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[var(--color-media-overlay)]/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[var(--color-media-surface)] rounded-2xl overflow-hidden border border-[var(--color-media-border)] shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="px-4 py-3 bg-[var(--color-media-panel)]/80 border-b border-[var(--color-media-control)] flex items-center justify-between text-white">
          <div className="min-w-0 pr-2">
            <h3 className="text-xs sm:text-sm font-semibold truncate text-[var(--color-media-text)]">
              {title}
            </h3>
            <span className="text-[10px] font-mono text-[var(--color-media-muted)] block truncate">
              {imageUrl}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onUpdateImage && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-2.5 py-1 rounded bg-[var(--color-media-control)] hover:bg-[var(--color-media-border)] text-xs font-mono text-[var(--color-accent)] border border-[var(--color-media-border)] transition-colors"
              >
                {isEditing ? (language === 'fr' ? 'Annuler' : 'Cancel') : (language === 'fr' ? 'Modifier lien' : 'Edit link')}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-[var(--color-media-control)] hover:bg-[var(--color-media-border)] text-[var(--color-media-subtle)] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Image Link Editor Dropdown */}
        {isEditing && (
          <form onSubmit={handleSave} className="p-3 bg-[var(--color-media-panel)] border-b border-[var(--color-media-control)] flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://... URL de la nouvelle image"
              required
              className="flex-1 px-3 py-1.5 rounded bg-[var(--color-media-control)] border border-[var(--color-media-border)] text-xs font-mono text-white focus:outline-none focus:border-[var(--color-accent)]"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-mono font-semibold flex items-center justify-center gap-1"
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
              <span>{saved ? (language === 'fr' ? 'Enregistré' : 'Saved') : (language === 'fr' ? 'Appliquer' : 'Apply')}</span>
            </button>
          </form>
        )}

        {/* Image Area */}
        <div className="relative max-h-[70vh] flex items-center justify-center bg-[var(--color-media-overlay)] p-2">
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
        <div className="px-4 py-2.5 bg-[var(--color-media-panel)]/90 border-t border-[var(--color-media-control)] flex items-center justify-between text-[var(--color-media-muted)] text-xs font-mono">
          <span>{language === 'fr' ? 'Lien dynamique actif' : 'Active dynamic image link'}</span>
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] flex items-center gap-1"
          >
            <span>{language === 'fr' ? 'Ouvrir originale' : 'Open original'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
