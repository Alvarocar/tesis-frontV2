/**
 * Cross-route View Transitions handoff for the job card ↔ job detail pair.
 *
 * The View Transitions API cross-fades DOM snapshots from the previous and
 * next pages. The same `view-transition-name` must exist on both sides at
 * the moment of the transition. Forward navigation (list → detail) works
 * out of the box because both elements are present in the DOM at the time
 * `startViewTransition` is called.
 *
 * The reverse direction (detail → list) is trickier: when the detail page
 * unmounts, its `view-transition-name` disappears, and by the time the
 * list remounts there's no pairing target on the new side. The common
 * workaround is to keep a "last-viewed job id" marker in sessionStorage
 * and let the list re-apply the name to the matching card just before the
 * transition fires. This module centralises that handshake.
 */

const KEY = "vt:last-job-id";

export const rememberLastViewedJob = (id: number) => {
  try {
    sessionStorage.setItem(KEY, String(id));
  } catch {
    // sessionStorage may be disabled (private mode, etc.) — fail open.
  }
};

export const consumeLastViewedJob = (): number | null => {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    const id = Number(raw);
    return Number.isFinite(id) ? id : null;
  } catch {
    return null;
  }
};
