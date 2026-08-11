"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path ? styles.active : "";
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/logoEpa.png"
            alt="EPA - Entidad Protectora de Animales"
            width={75}
            height={75}
            priority
          />
        </Link>

        <nav className={styles.desktopNav}>
          <Link href="/" className={`${styles.navLink} ${isActive("/")}`}>
            Inicio
          </Link>

          <Link
            href="/animals"
            className={`${styles.navLink} ${isActive("/animals")}`}
          >
            Animales
          </Link>

          <Link
            href="/nosotros"
            className={`${styles.navLink} ${isActive("/nosotros")}`}
          >
            Sobre nosotros
          </Link>

          <Link
            href="https://link.mercadopago.com.ar/pruebafundacion1992"
            className={styles.button}
            target="_blank"
            rel="noopener noreferrer"
          >
            Donar ahora
          </Link>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {menuOpen && (
        <nav className={styles.mobileNav}>
          <Link href="/" onClick={closeMenu} className={isActive("/")}>
            Inicio
          </Link>

          <Link
            href="/animals"
            onClick={closeMenu}
            className={isActive("/animals")}
          >
            Animales
          </Link>

          <Link
            href="/noticias"
            onClick={closeMenu}
            className={isActive("/noticias")}
          >
            Noticias
          </Link>

          <Link
            href="/nosotros"
            onClick={closeMenu}
            className={isActive("/nosotros")}
          >
            Sobre nosotros
          </Link>

          <Link
            href="#donaciones"
            className={styles.mobileDonate}
            onClick={closeMenu}
          >
            Donar
          </Link>
        </nav>
      )}
    </header>
  );
}
