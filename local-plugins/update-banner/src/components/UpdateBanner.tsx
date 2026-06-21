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

// Rendered via the `beforeBody` layout slot (see quartz.config.yaml), which
// nests it inside the center column alongside the sidebars (DefaultFrame.tsx).
// `position: fixed` (in update-banner.scss) escapes that nesting so it spans
// the full viewport width above everything, without touching the core frame
// templates. quartz/styles/custom.scss separately reserves layout space for
// it via a `:has(.update-banner)` selector.
export default ((opts?: UpdateBannerOptions) => {
  const options = { ...defaultOptions, ...opts };

  const UpdateBanner: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <div class={`update-banner ${displayClass ?? ""}`}>
        <div class="update-banner-badge">
          <span class="update-banner-dot" />
          {options.badge}
        </div>
        <div class="update-banner-ticker">
          <div class="update-banner-track">
            <span class="update-banner-item">{options.text}</span>
            <span class="update-banner-item">{options.text}</span>
          </div>
        </div>
      </div>
    );
  };

  UpdateBanner.css = style;
  return UpdateBanner;
}) satisfies QuartzComponentConstructor;
