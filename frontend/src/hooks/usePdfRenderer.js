import { useState, useEffect, useRef, useCallback } from 'react';

// Lazy-initialise the lib once
let pdfjsLib = null;

async function getPdfjsLib() {
  if (pdfjsLib) return pdfjsLib;
  const lib = await import('pdfjs-dist');
  // v5: worker is resolved via the workerSrc string
  lib.GlobalWorkerOptions.workerSrc =
    `${window.location.origin}${process.env.PUBLIC_URL || ''}/pdf.worker.min.js`;
  pdfjsLib = lib;
  return lib;
}

/**
 * Renders all pages of a remote PDF URL to base64 PNG data-URLs.
 * Returns { canvases, numPages, loading, error }
 */
export function usePdfRenderer(pdfUrl) {
  const [canvases, setCanvases] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const pdfDocRef               = useRef(null);

  const renderAllPages = useCallback(async (pdfDoc, scale = 1.5) => {
    const pages = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page     = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas   = document.createElement('canvas');
      canvas.width   = viewport.width;
      canvas.height  = viewport.height;
      const ctx      = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;
      pages.push(canvas.toDataURL('image/png'));
    }
    setCanvases(pages);
  }, []);

  useEffect(() => {
    if (!pdfUrl) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      setCanvases([]);
      try {
        const lib    = await getPdfjsLib();
        const pdfDoc = await lib.getDocument({ url: pdfUrl, withCredentials: false }).promise;
        if (cancelled) return;
        pdfDocRef.current = pdfDoc;
        setNumPages(pdfDoc.numPages);
        await renderAllPages(pdfDoc);
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load PDF preview.');
          console.error('[usePdfRenderer]', err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [pdfUrl, renderAllPages]);

  return { canvases, numPages, loading, error };
}
