import { useState, useEffect } from 'react';

/**
 * Observes when an element enters or leaves the viewport.
 *
 * @param {React.RefObject<Element|null>} ref - Ref to the element to observe
 * @param {Object} options - IntersectionObserver options
 * @param {number|number[]} [options.threshold=0] - Ratio of visibility (0–1) to trigger callback
 * @param {string} [options.rootMargin='0px'] - Margin around the root (e.g. '-100px' to trigger earlier)
 * @param {Element|null} [options.root=null] - Root element (default: viewport)
 * @returns {{ inView: boolean }} - inView is true when the element intersects the root
 */
export function useIntersectionObserver(ref, options = {}) {
  const { threshold = 0, rootMargin = '0px', root = null } = options;

  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin, root }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, root]);

  return { inView };
}
