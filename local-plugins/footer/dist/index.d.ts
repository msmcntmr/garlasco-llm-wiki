import { QuartzComponent } from '@quartz-community/types';
export { QuartzComponent, QuartzComponentProps, StringResource } from '@quartz-community/types';

interface SupportOptions {
    heading: string;
    text: string;
    buttonLabel: string;
    /** Donation page (Ko-fi). Empty = the support box is not rendered. */
    url: string;
}
interface FooterOptions {
    links: Record<string, string>;
    /** Donation box shown right above "Created with". */
    support?: Partial<SupportOptions>;
}
declare const _default: (opts?: FooterOptions) => QuartzComponent;

export { _default as Footer, type FooterOptions };
