// Broadcast-style lower-third scroll: constant pixel speed, computed from the
// *actual measured* ticker/message widths rather than a fixed CSS keyframe
// duration. That's what makes it loop with zero dead time regardless of
// viewport size or message length — the message starts exactly one ticker-
// width off the right edge and ends exactly one message-width past the left
// edge (fully hidden behind the badge), then immediately restarts.
const SPEED_PX_PER_SEC = 45;

function setupUpdateBanner() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  for (const ticker of document.querySelectorAll<HTMLElement>(".update-banner-ticker")) {
    const item = ticker.querySelector<HTMLElement>(".update-banner-item");
    if (!item) continue;

    if (reduceMotion) {
      item.style.transform = "translateY(-50%)";
      continue;
    }

    let cancelled = false;
    let timeoutId: number | undefined;

    const runCycle = () => {
      if (cancelled) return;

      const tickerWidth = ticker.clientWidth;
      const itemWidth = item.offsetWidth;
      if (tickerWidth <= 0 || itemWidth <= 0) {
        timeoutId = window.setTimeout(runCycle, 200);
        return;
      }

      const distance = tickerWidth + itemWidth;
      const durationMs = (distance / SPEED_PX_PER_SEC) * 1000;

      // Snap to the start position with transitions disabled, force a reflow
      // so the browser commits that state, then re-enable the transition and
      // set the end position — the standard way to restart a CSS transition
      // reliably (otherwise the browser can coalesce the two style writes).
      item.style.transition = "none";
      item.style.transform = `translateY(-50%) translateX(${tickerWidth}px)`;
      void item.offsetWidth;
      item.style.transition = `transform ${durationMs}ms linear`;
      item.style.transform = `translateY(-50%) translateX(${-itemWidth}px)`;

      timeoutId = window.setTimeout(runCycle, durationMs);
    };

    runCycle();

    window.addCleanup(() => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    });
  }
}

document.addEventListener("nav", setupUpdateBanner);
