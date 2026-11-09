#!/bin/sh
# Génère public/cv/CV-Nkoumou-Tjade-Grinnel-Germain.pdf depuis cv/cv.html
# Nécessite Chrome/Chromium (CHROME=/chemin/vers/chrome pour forcer un binaire).
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser || ls -d "$HOME"/.cache/ms-playwright/chromium-*/chrome-linux/chrome 2>/dev/null | tail -1)}"
[ -x "$CHROME" ] || { echo "Chrome/Chromium introuvable (définir CHROME=...)"; exit 1; }
mkdir -p public/cv
"$CHROME" --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=5000 \
  --print-to-pdf="public/cv/CV-Nkoumou-Tjade-Grinnel-Germain.pdf" "file://$PWD/cv/cv.html"
echo "OK -> public/cv/CV-Nkoumou-Tjade-Grinnel-Germain.pdf"
