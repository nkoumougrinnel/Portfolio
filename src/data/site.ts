/** CV provisoire (généré depuis cv/cv.html via `sh cv/build.sh`). */
export const CV_URL = '/cv/CV-Nkoumou-Tjade-Grinnel-Germain.pdf';
export const CV_FILENAME = 'CV-Nkoumou-Tjade-Grinnel-Germain.pdf';

/** Traduit les libellés anglais présents dans les périodes (« Present », « July »…). */
export function localizePeriod(period: string, language: 'fr' | 'en'): string {
  if (language === 'en') return period;
  return period
    .replace(/\bPresent\b/g, 'présent')
    .replace(/\b3rd Year\b/g, '3e année')
    .replace(/\bJuly\b/g, 'Juil.')
    .replace(/\bSept\b/g, 'Sept.');
}
