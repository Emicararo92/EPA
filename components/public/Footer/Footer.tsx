import Link from "next/link";
import { FaPaw, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FiArrowUpRight, FiHeart } from "react-icons/fi";
import styles from "./Footer.module.css";

const navigation = [
  {
    number: "01",
    label: "Inicio",
    href: "/",
  },
  {
    number: "02",
    label: "Animales",
    href: "/animals",
  },
  {
    number: "03",
    label: "Sobre nosotros",
    href: "/nosotros",
  },
];

const helpLinks = [
  {
    label: "Adoptar",
    href: "/animals",
  },
  {
    label: "Donar",
    href: "#donaciones",
  },
  {
    label: "Cómo ayudar",
    href: "#como-ayudar",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className={styles.main}>
        <div className={styles.container}>
          {/* =================================================
              BRAND / MESSAGE
          ================================================== */}

          <div className={styles.brandColumn}>
            <Link href="/" className={styles.brand} aria-label="EPA - Inicio">
              <span className={styles.brandName}>EPA</span>

              <span className={styles.brandPaw} aria-hidden="true">
                <FaPaw />
              </span>
            </Link>

            <p className={styles.description}>
              Rescatamos, cuidamos y acompañamos animales que esperan encontrar
              un hogar donde volver a sentirse queridos.
            </p>

            <div className={styles.socials}>
              <a href="#" className={styles.social} aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" className={styles.social} aria-label="Facebook">
                <FaFacebookF />
              </a>
            </div>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================== */}

          <div className={styles.column}>
            <span className={styles.eyebrow}>Explorar</span>

            <nav className={styles.links}>
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className={styles.link}>
                  <span className={styles.number}>{item.number}</span>

                  <span>{item.label}</span>

                  <FiArrowUpRight className={styles.linkArrow} />
                </Link>
              ))}
            </nav>
          </div>

          {/* =================================================
              HELP
          ================================================== */}

          <div className={styles.column}>
            <span className={styles.eyebrow}>Podés ayudar</span>

            <nav className={styles.links}>
              {helpLinks.map((item, index) => (
                <Link key={item.href} href={item.href} className={styles.link}>
                  <span className={styles.number}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{item.label}</span>

                  <FiArrowUpRight className={styles.linkArrow} />
                </Link>
              ))}
            </nav>
          </div>

          {/* =================================================
              CTA
          ================================================== */}

          <div className={styles.ctaColumn}>
            <span className={styles.eyebrow}>Una vida puede cambiar</span>

            <h2 className={styles.ctaTitle}>
              Tal vez su
              <br />
              hogar seas vos.
            </h2>

            <Link href="/animals" className={styles.ctaLink}>
              <span>Conocé a nuestros animales</span>

              <span className={styles.ctaIcon}>
                <FiArrowUpRight />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          DIVIDER
      ====================================================== */}

      <div className={styles.divider}>
        <div className={styles.container}>
          <div className={styles.dividerLine} />

          <div className={styles.paw} aria-hidden="true">
            <FaPaw />
          </div>

          <div className={styles.dividerLine} />
        </div>
      </div>

      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <div className={styles.bottom}>
        <div className={styles.container}>
          <div className={styles.copyright}>
            <span>© {new Date().getFullYear()} EPA</span>

            <span className={styles.dot}>•</span>

            <span>Todos los derechos reservados</span>
          </div>

          {/* =================================================
              EMILIANO CREDIT
          ================================================== */}

          <div className={styles.credit}>
            <span>
              Diseñado y desarrollado con
              <FiHeart className={styles.heart} aria-hidden="true" />
              por
            </span>

            <a
              href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.developer}
            >
              Emiliano Cararo
              <FiArrowUpRight className={styles.developerArrow} />
            </a>

            <span className={styles.creditSeparator}>·</span>

            <a
              href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projects}
            >
              Conocé otros proyectos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
