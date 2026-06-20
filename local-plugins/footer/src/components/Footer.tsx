import { readFileSync } from "fs";
import { join } from "path";
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { i18n } from "../i18n";
import style from "./styles/footer.scss";

function getQuartzVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf-8"));
    return pkg.version ?? "";
  } catch {
    return "";
  }
}

// QUARTZ_VAULT_SHA is set by .github/workflows/deploy.yaml to the short commit
// SHA of the vault content checked out for this build. Unset on local builds.
function formatBuildTimestamp(date: Date): string {
  const iso = date.toISOString();
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`;
}

export interface FooterOptions {
  links: Record<string, string>;
}

export default ((opts?: FooterOptions) => {
  const version = getQuartzVersion();
  const buildTimestamp = formatBuildTimestamp(new Date());
  const deploySha = process.env.QUARTZ_VAULT_SHA;

  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear();
    const links = opts?.links ?? [];
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg?.locale ?? "en-US").components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz{version ? ` v${version}` : ""}</a> &copy;{" "}
          {year}
        </p>
        <p class="lastUpdated">
          Last update: {buildTimestamp}
          {deploySha ? ` · ${deploySha}` : ""}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
        <div class="disclaimer">
          <p>
            Le informazioni contenute in questo sito web sono tratte esclusivamente da fonti di
            pubblico dominio, tra cui articoli giornalistici, atti pubblici, dichiarazioni
            ufficiali e altri materiali liberamente accessibili online. Il sito è gestito
            nell'esercizio del diritto di libera manifestazione del pensiero, garantito dall'art.
            21 della Costituzione Italiana, e nel rispetto dei principi del diritto di cronaca
            come consolidati dalla giurisprudenza della Corte di Cassazione.
          </p>
          <p>
            Le eventuali analisi, ipotesi interpretative o contenuti elaborati tramite
            intelligenza artificiale generativa sono chiaramente riconducibili alle rispettive
            fonti o indicati come tali, e non costituiscono in alcun caso affermazioni di fatto
            certificate dall'autore del sito. Il materiale è raccolto e presentato con finalità di
            documentazione, informazione pubblica e analisi critica, senza alcun intento
            diffamatorio, denigratorio o lesivo dell'onore e della reputazione di alcuna persona
            fisica o giuridica, ai sensi degli artt. 595 e 596 c.p.
          </p>
          <p>
            Ai sensi del Regolamento UE 2016/679 (GDPR) e del D.lgs. 196/2003 (Codice della
            Privacy), i dati personali eventualmente citati sono trattati esclusivamente per
            finalità di interesse pubblico e di cronaca giudiziaria, nel rispetto del principio di
            essenzialità dell'informazione. Il titolare del sito non raccoglie né tratta dati
            personali degli utenti del sito per finalità diverse dalla semplice navigazione.
          </p>
          <p>
            Questo sito non intende in alcun modo ostacolare, interferire o sostituirsi
            all'attività delle autorità giudiziarie competenti. I contenuti pubblicati non
            rappresentano la posizione ufficiale di alcun organo giudiziario o istituzionale.
          </p>
          <p>
            Per richiedere la revisione, la rettifica o la rimozione di informazioni ritenute non
            veritiere, datate, o derivanti da errori generativi, è possibile aprire una
            segnalazione tramite l'apposito sistema di tracciamento all'indirizzo{" "}
            <a href="https://github.com/msmcntmr/garlasco-llm-wiki/issues">
              github.com/msmcntmr/garlasco-llm-wiki/issues
            </a>
            , oppure inviare una comunicazione scritta a:{" "}
            <a href="mailto:epitome.beak-1g@icloud.com">epitome.beak-1g@icloud.com</a>. Le
            richieste verranno valutate entro un termine ragionevole.
          </p>
        </div>
      </footer>
    );
  };

  Footer.css = style;
  return Footer;
}) satisfies QuartzComponentConstructor;
