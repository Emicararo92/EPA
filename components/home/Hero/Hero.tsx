import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.banner}>
        <Image
          src="/banner.png"
          alt="Perro siendo adoptado por una familia"
          fill
          priority
          sizes="100vw"
          className={styles.image}
          quality={90}
        />

        <div className={styles.overlay} />

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            🐾 Entidad Protectora de Animales
          </span>

          <h1 className={styles.title}>
            Una segunda <span>oportunidad</span>
            <br />
            puede cambiar una vida.
          </h1>

          <p className={styles.description}>
            Rescatamos, cuidamos y acompañamos a animales que esperan encontrar
            un hogar donde volver a sentirse queridos.
          </p>

          <div className={styles.actions}>
            <Link href="/animals" className={styles.primaryButton}>
              Ver animales
            </Link>

            <Link href="#donaciones" className={styles.secondaryButton}>
              Quiero donar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
