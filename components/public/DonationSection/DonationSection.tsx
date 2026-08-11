import Link from "next/link";
import styles from "./DonationSection.module.css";

export default function DonationSection() {
  return (
    <section id="donaciones" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Ayudanos a seguir ayudando</span>

          <h2 className={styles.title}>
            Tu ayuda puede cambiar
            <br />
            una vida.
          </h2>

          <p className={styles.description}>
            Cada aporte nos permite seguir rescatando, cuidando y dando nuevas
            oportunidades a animales que necesitan un hogar.
          </p>

          <Link
            href="https://link.mercadopago.com.ar/pruebafundacion1992"
            className={styles.button}
            target="_blank"
            rel="noopener noreferrer"
          >
            Donar ahora
          </Link>
        </div>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.number}>01</span>

            <div>
              <h3>Rescates</h3>
              <p>
                Ayudás a que podamos intervenir cuando un animal necesita
                nuestra ayuda.
              </p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.number}>02</span>

            <div>
              <h3>Cuidados</h3>
              <p>
                Tu aporte contribuye a cubrir alimentación, tratamientos y
                cuidados veterinarios.
              </p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.number}>03</span>

            <div>
              <h3>Nuevas oportunidades</h3>
              <p>
                Nos ayudás a preparar a cada animal para encontrar una familia
                que lo quiera.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
