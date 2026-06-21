import { QuartzComponent } from '@quartz-community/types';

interface UpdateBannerOptions {
    /** Fixed left-hand badge label, e.g. "In aggiornamento" */
    badge: string;
    /** Message that loops in the scrolling area */
    text: string;
}
declare const _default: (opts?: UpdateBannerOptions) => QuartzComponent;

export { _default as UpdateBanner, type UpdateBannerOptions };
