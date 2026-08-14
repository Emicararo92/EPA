"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FaPaw,
  FaHeart,
  FaHouse,
  FaPeopleGroup,
  FaHandHoldingHeart,
} from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import styles from "./EpaDivider.module.css";

type Variant = "impact" | "community" | "commitment";

type Props = {
  variant?: Variant;
};

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
};

function Counter({
  value,
  prefix = "+",
  suffix = "",
  label,
  icon,
  delay = 0,
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrame = 0;
    let startTime: number | null = null;

    const duration = 1200;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    const timeout = window.setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className={styles.counter}
      initial={{
        opacity: 0,
        y: 8,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className={styles.counterIcon}
        animate={
          isInView
            ? {
                rotate: [0, -6, 6, -3, 0],
              }
            : {}
        }
        transition={{
          duration: 0.65,
          delay: delay + 0.1,
        }}
      >
        {icon}
      </motion.div>

      <div className={styles.counterContent}>
        <strong>
          {prefix}
          {count}
          {suffix}
        </strong>

        <span>{label}</span>
      </div>
    </motion.div>
  );
}

function Actions() {
  return (
    <div className={styles.actions}>
      <Link href="/adopcion" className={`${styles.action} ${styles.adopt}`}>
        <span>Quiero adoptar</span>

        <span className={styles.actionIcon}>
          <FiArrowUpRight />
        </span>
      </Link>

      <Link href="#donaciones" className={`${styles.action} ${styles.donate}`}>
        <span>Quiero donar</span>

        <span className={styles.actionIcon}>
          <FiArrowUpRight />
        </span>
      </Link>
    </div>
  );
}

function ImpactDivider() {
  return (
    <section className={`${styles.divider} ${styles.impact}`}>
      <div className={styles.container}>
        <div className={styles.impactMessage}>
          <span className={styles.eyebrow}>El impacto de EPA</span>

          <h2>Historias que ya cambiaron.</h2>
        </div>

        <div className={styles.counters}>
          <Counter value={150} label="Animales rescatados" icon={<FaPaw />} />

          <Counter
            value={120}
            label="Adopciones concretadas"
            icon={<FaHeart />}
            delay={0.1}
          />

          <Counter
            value={6}
            suffix=" años"
            label="Acompañando historias"
            icon={<FaHandHoldingHeart />}
            delay={0.2}
          />
        </div>

        <Actions />
      </div>
    </section>
  );
}

function CommunityDivider() {
  return (
    <section className={`${styles.divider} ${styles.community}`}>
      <div className={styles.container}>
        <div className={styles.communityMessage}>
          <span className={styles.eyebrow}>Nuestra comunidad</span>

          <h2>Nadie rescata solo.</h2>
        </div>

        <div className={styles.counters}>
          <Counter
            value={40}
            label="Familias que abrieron sus puertas"
            icon={<FaHouse />}
          />

          <Counter
            value={25}
            label="Personas que colaboran"
            icon={<FaPeopleGroup />}
            delay={0.1}
          />

          <Counter
            value={80}
            label="Hogares alcanzados"
            icon={<FaHeart />}
            delay={0.2}
          />
        </div>

        <Actions />
      </div>
    </section>
  );
}

function CommitmentDivider() {
  return (
    <section className={`${styles.divider} ${styles.commitment}`}>
      <div className={styles.container}>
        <div className={styles.commitmentMessage}>
          <div className={styles.bigPaw}>
            <FaPaw />
          </div>

          <div>
            <span className={styles.eyebrow}>Nuestro compromiso</span>

            <h2>Cada vida importa.</h2>
          </div>
        </div>

        <div className={styles.commitmentStats}>
          <Counter
            value={100}
            prefix=""
            suffix="%"
            label="Adopción responsable"
            icon={<FaHandHoldingHeart />}
          />

          <Counter
            value={24}
            prefix=""
            suffix="/7"
            label="Acompañamiento"
            icon={<FaHeart />}
            delay={0.1}
          />

          <Counter
            value={6}
            suffix=" años"
            label="Compromiso"
            icon={<FaPaw />}
            delay={0.2}
          />
        </div>

        <Actions />
      </div>
    </section>
  );
}

export default function EpaDivider({ variant = "impact" }: Props) {
  switch (variant) {
    case "community":
      return <CommunityDivider />;

    case "commitment":
      return <CommitmentDivider />;

    case "impact":
    default:
      return <ImpactDivider />;
  }
}
