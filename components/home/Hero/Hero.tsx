"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.banner}>
        <picture className={styles.picture}>
          <source media="(max-width: 560px)" srcSet="/FondoCelu.png" />

          <Image
            src="https://res.cloudinary.com/diefdex1h/image/upload/v1786727290/ChatGPT_Image_14_ago_2026_02_06_47_p.m._sdzvbp.png"
            alt="Perro siendo adoptado por una familia"
            fill
            priority
            sizes="100vw"
            className={styles.image}
            quality={90}
          />
        </picture>

        <div className={styles.overlay} />

        <div className={styles.content}>
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Entidad Protectora de Animales
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Una segunda <span className={styles.highlight}>oportunidad</span>
            <br />
            puede cambiar
            <br />
            una vida.
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Rescatamos, cuidamos y acompañamos a animales que esperan encontrar
            un hogar donde volver a sentirse queridos.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link href="/animals" className={styles.primaryButton}>
              <span>Ver animales</span>

              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>

            <Link href="#donaciones" className={styles.secondaryButton}>
              Quiero donar
            </Link>
          </motion.div>
        </div>

        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
          }}
          aria-hidden="true"
        >
          <span>Descubrí sus historias</span>
          <span className={styles.scrollLine} />
        </motion.div>
      </div>
    </section>
  );
}
