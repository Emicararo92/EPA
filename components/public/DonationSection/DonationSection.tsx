"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  FaPaw,
  FaHeart,
  FaHandHoldingHeart,
  FaArrowRight,
} from "react-icons/fa";
import styles from "./DonationSection.module.css";

const donationOptions = [
  {
    label: "$2500",
    link: "https://link.mercadopago.com.ar/pruebafundacion1992",
  },
  {
    label: "$5000",
    link: "https://link.mercadopago.com.ar/pruebafundacion1992",
  },
  {
    label: "$10000",
    link: "https://link.mercadopago.com.ar/pruebafundacion1992",
  },
  {
    label: "$20000",
    link: "https://link.mercadopago.com.ar/pruebafundacion1992",
  },
  {
    label: "Libre",
    link: "https://link.mercadopago.com.ar/pruebafundacion1992",
  },
];

const pawVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -15,
  },

  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState("$5000");

  const selectedOption =
    donationOptions.find((option) => option.label === selectedAmount) ??
    donationOptions[1];

  return (
    <section id="donaciones" className={styles.section}>
      <div className={styles.backgroundPaw}>
        <FaPaw />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>Ayudanos a seguir ayudando</span>
          </div>

          <h2 className={styles.title}>
            Una pequeña ayuda.
            <br />
            <span>Una gran oportunidad.</span>
          </h2>

          <p className={styles.description}>
            Cada aporte nos permite seguir rescatando, cuidando y acompañando a
            animales que esperan una nueva oportunidad.
          </p>

          <div className={styles.amountWrapper}>
            <span className={styles.amountLabel}>Elegí tu aporte</span>

            <div className={styles.amounts}>
              {donationOptions.map((option, index) => (
                <motion.button
                  key={option.label}
                  type="button"
                  className={`${styles.amount} ${
                    selectedAmount === option.label ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedAmount(option.label)}
                  variants={pawVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index * 0.08}
                  whileHover={{
                    y: -4,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  aria-pressed={selectedAmount === option.label}
                >
                  <span className={styles.amountPaw}>
                    <FaPaw />
                  </span>

                  <span className={styles.amountText}>{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className={styles.actionArea}>
            <motion.div
              className={styles.selectedMessage}
              key={selectedAmount}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <FaHeart />

              <span>
                Tu aporte de{" "}
                <strong>
                  {selectedAmount === "Libre"
                    ? "cualquier monto"
                    : selectedAmount}
                </strong>{" "}
                suma una nueva oportunidad.
              </span>
            </motion.div>

            <Link
              href={selectedOption.link}
              className={styles.donateButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                {selectedAmount === "Libre"
                  ? "Donar ahora"
                  : `Donar ${selectedAmount}`}
              </span>

              <span className={styles.buttonIcon}>
                <FaArrowRight />
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{
            opacity: 0,
            scale: 0.9,
            rotate: 2,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={styles.visualCard}>
            <div className={styles.cardPaw}>
              <FaPaw />
            </div>

            <div className={styles.cardIcon}>
              <FaHandHoldingHeart />
            </div>

            <span className={styles.cardSmall}>CADA APORTE</span>

            <strong className={styles.cardTitle}>
              Se transforma
              <br />
              en cuidado.
            </strong>

            <p className={styles.cardText}>
              Alimentación, atención veterinaria, tratamientos y todo lo que
              necesitan mientras esperan su hogar.
            </p>

            <div className={styles.cardFooter}>
              <span>EPA</span>

              <div className={styles.cardDots}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <motion.div
            className={styles.floatingPaw}
            animate={{
              y: [0, -8, 0],
              rotate: [-8, 4, -8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaPaw />
          </motion.div>

          <motion.div
            className={styles.floatingHeart}
            animate={{
              y: [0, -6, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <FaHeart />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
