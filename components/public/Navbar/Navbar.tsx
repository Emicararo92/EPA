/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaDog, FaPaw } from "react-icons/fa";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import styles from "./Navbar.module.css";

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

const mobileNavigation = [
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
    label: "Noticias",
    href: "/noticias",
  },
  {
    number: "04",
    label: "Sobre nosotros",
    href: "/nosotros",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`${styles.navbar} ${
        scrolled ? styles.scrolled : ""
      } ${menuOpen ? styles.open : ""}`}
    >
      {/* =====================================================
          DOG RUNNER
      ====================================================== */}

      <div className={styles.runnerTrack} aria-hidden="true">
        <motion.div
          className={styles.dogRunner}
          animate={{
            x: ["-10vw", "110vw"],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 12,
          }}
        >
          <div className={styles.dogPaws}>
            <FaPaw />
            <FaPaw />
            <FaPaw />
          </div>

          <motion.div
            className={styles.dog}
            animate={{
              y: [0, -1.5, 0, -1.5, 0],
              rotate: [0, -1, 0, 1, 0],
            }}
            transition={{
              duration: 0.32,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <FaDog />
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.inner}>
        {/* =====================================================
            BRAND
        ====================================================== */}

        <Link
          href="/"
          className={styles.brand}
          onClick={closeMenu}
          aria-label="EPA - Inicio"
        >
          <span className={styles.brandMark}>EPA</span>

          <span className={styles.pawTrail} aria-hidden="true">
            <FaPaw className={styles.pawOne} />
            <FaPaw className={styles.pawTwo} />
            <FaPaw className={styles.pawThree} />
          </span>
        </Link>

        {/* =====================================================
            DESKTOP NAV
        ====================================================== */}

        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${
                isActive(item.href) ? styles.active : ""
              }`}
            >
              <span className={styles.navNumber}>{item.number}</span>

              <span className={styles.navLabel}>{item.label}</span>

              <span className={styles.navPaw} aria-hidden="true">
                <FaPaw />
              </span>
            </Link>
          ))}
        </nav>

        {/* =====================================================
            DONATE
        ====================================================== */}

        <Link
          href="https://link.mercadopago.com.ar/pruebafundacion1992"
          className={styles.donate}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.donateText}>Donar</span>

          <span className={styles.donateArrow}>
            <FiArrowUpRight aria-hidden="true" />
          </span>
        </Link>

        {/* =====================================================
            MOBILE BUTTON
        ====================================================== */}

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="epa-mobile-navigation"
        >
          <span>{menuOpen ? "Cerrar" : "Menú"}</span>

          <span className={styles.menuIcon}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </span>
        </button>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="epa-mobile-navigation"
            className={styles.mobileNav}
            aria-label="Navegación móvil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.mobileInner}>
              <div className={styles.mobileEyebrow}>
                Entidad Protectora de Animales
              </div>

              <div className={styles.mobileLinks}>
                {mobileNavigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.35,
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`${styles.mobileLink} ${
                        isActive(item.href) ? styles.mobileActive : ""
                      }`}
                      onClick={closeMenu}
                    >
                      <span className={styles.mobileNumber}>{item.number}</span>

                      <strong>{item.label}</strong>

                      <span className={styles.mobilePaw} aria-hidden="true">
                        <FaPaw />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#donaciones"
                className={styles.mobileDonate}
                onClick={closeMenu}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.25,
                  duration: 0.35,
                }}
              >
                <span>Quiero donar</span>

                <span className={styles.mobileDonateIcon}>
                  <FiArrowUpRight />
                </span>
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
