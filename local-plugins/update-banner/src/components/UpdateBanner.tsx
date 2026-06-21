import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import style from "./styles/update-banner.scss";

export interface UpdateBannerOptions {
  /** Fixed left-hand badge label, e.g. "In aggiornamento" */
  badge: string;
  /** Message that loops in the scrolling area */
  text: string;
}

const defaultOptions: UpdateBannerOptions = {
  badge: "In aggiornamento",
  text: "Il sito è in fase di aggiornamento — alcuni contenuti potrebbero cambiare.",
};

// Repeating the message many times (rather than the minimum 2 copies needed
// for the seamless-loop trick) guarantees the track is wider than the ticker
// viewport regardless of message length or screen width — otherwise the
// track runs out of content before reaching the right edge, leaving a gap of
// bare background that reads as the scroll "starting from the middle".
const REPEAT_COUNT = 20;

// Rendered via the `beforeBody` layout slot (see quartz.config.yaml), which
// nests it inside the center column alongside the sidebars (DefaultFrame.tsx).
// `position: fixed` (in update-banner.scss) escapes that nesting so it spans
// the full viewport width above everything, without touching the core frame
// templates. quartz/styles/custom.scss separately reserves layout space for
// it via a `:has(.update-banner)` selector.
export default ((opts?: UpdateBannerOptions) => {
  const options = { ...defaultOptions, ...opts };

  // Two identical halves, each repeated REPEAT_COUNT times: translateX(-50%)
  // then shifts the track by exactly one half's width, so the loop seam is
  // invisible regardless of REPEAT_COUNT or message length.
  const messageSet = Array.from({ length: REPEAT_COUNT }, (_, i) => (
    <span class="update-banner-item" key={i}>
      {options.text}
    </span>
  ));

  const UpdateBanner: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <div class={`update-banner ${displayClass ?? ""}`}>
        <div class="update-banner-badge">
          <span class="update-banner-dot" />
          {options.badge}
        </div>
        <div class="update-banner-ticker">
          <div class="update-banner-track">
            {messageSet}
            {messageSet}
          </div>
        </div>
      </div>
    );
  };

  UpdateBanner.css = style;
  return UpdateBanner;
}) satisfies QuartzComponentConstructor;
