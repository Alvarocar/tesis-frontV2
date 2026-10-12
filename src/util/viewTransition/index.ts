/**
 * View Transitions helper.
 *
 * The View Transitions API (https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
 * cross-fades old and new DOM snapshots. We use it to morph the JobCard into
 * the JobDetail's hero block when navigating from the list.
 *
 * Browser support: Chrome / Edge 111+, Safari TP, behind a flag in Firefox.
 * We detect support at call time and fall back to a synchronous navigation
 * when the API is not available, so this is safe to call everywhere.
 */

type DocumentWithViewTransition = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    skipTransition: () => void;
  };
}

export const supportsViewTransitions = (): boolean => {
  if (typeof document === "undefined") return false;
  return typeof (document as DocumentWithViewTransition).startViewTransition === "function";
}

/**
 * Wraps a navigation (or any DOM mutation) in a view transition.
 * If the browser doesn't support the API, runs the callback synchronously
 * so the user still gets to where they were going.
 */
export const withViewTransition = (mutate: () => void | Promise<void>): void => {
  const doc = document as DocumentWithViewTransition;
  if (!doc.startViewTransition) {
    void mutate();
    return;
  }
  doc.startViewTransition(() => {
    const result = mutate();
    // The callback may return a Promise if it needs to wait for async work
    // (e.g. route data). Returning it tells the browser to wait.
    return result;
  });
}
