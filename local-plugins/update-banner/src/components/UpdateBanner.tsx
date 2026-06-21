import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import style from "./styles/update-banner.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./scripts/update-banner.inline.ts";

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

// Rendered via the `afterBody` layout slot (see quartz.config.yaml), which
// nests it inside `.page-footer` (DefaultFrame.tsx). `position: fixed` (in
// update-banner.scss) escapes that nesting so it spans the full viewport
// width above everything, without touching the core frame templates.
// quartz/styles/custom.scss separately reserves layout space for it via a
// `:has(.update-banner)` selector.
//
// Deliberately NOT `beforeBody`: that slot is wrapped in a div with class
// "popover-hint", and Quartz's link-hover-preview popover
// (quartz/components/scripts/popover.inline.ts) clones every ".popover-hint"
// element off the fetched target page into the preview box — which duplicated
// this banner inside every hover popover. `afterBody`'s wrapper (.page-footer)
// isn't grabbed by that logic.
export default ((opts?: UpdateBannerOptions) => {
  const options = { ...defaultOptions, ...opts };

  const UpdateBanner: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <div class={`update-banner ${displayClass ?? ""}`}>
        <div class="update-banner-badge">
          <span class="update-banner-dot" />
          {options.badge}
        </div>
        {/* .update-banner-ticker clips; update-banner.inline.ts measures its
            width and the message's width to drive a constant-speed sweep
            from fully off the right edge to fully hidden behind the badge,
            then restarts immediately — see that script for why this isn't a
            CSS @keyframes animation. */}
        <div class="update-banner-ticker">
          <span class="update-banner-item">{options.text}</span>
        </div>
      </div>
    );
  };

  UpdateBanner.afterDOMLoaded = script;
  UpdateBanner.css = style;
  return UpdateBanner;
}) satisfies QuartzComponentConstructor;
