import { FaPaw, FaHeart, FaHandsHelping } from "react-icons/fa";
import styles from "./EpaDivider.module.css";

type Props = {
  variant?: "sand" | "white";
};

export default function EpaDivider({ variant = "sand" }: Props) {
  return (
    <section
      className={`${styles.divider} ${
        variant === "white" ? styles.white : styles.sand
      }`}
    >
      <div className={styles.container}>
        <div className={styles.item}>
          <FaPaw className={styles.icon} />

          <div className={styles.content}>
            <strong>+150</strong>
            <span>Animales rescatados</span>
          </div>
        </div>

        <div className={styles.separator} />

        <div className={styles.item}>
          <FaHeart className={styles.icon} />

          <div className={styles.content}>
            <strong>+6 años</strong>
            <span>De compromiso</span>
          </div>
        </div>

        <div className={styles.separator} />

        <div className={styles.message}>
          <span>COMPROMISO</span>
          <strong>CADA VIDA IMPORTA</strong>
        </div>

        <div className={styles.separator} />

        <a href="#donar" className={styles.join}>
          <FaHandsHelping className={styles.joinIcon} />
          <span>SUMATE</span>
        </a>
      </div>
    </section>
  );
}
