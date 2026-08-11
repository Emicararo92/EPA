/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import {
  FaPaw,
  FaHeart,
  FaHandsHelping,
  FaHome,
  FaShieldAlt,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

import styles from "./NosotrosPage.module.css";

export default function NosotrosPage() {
  return (
    <main className={styles.page}>
      {/* =========================================
          HERO
      ========================================= */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} />

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              <FaPaw />
              Sobre EPA
            </span>

            <h1 className={styles.heroTitle}>
              Detrás de cada
              <br />
              rescate hay una
              <br />
              <em>historia.</em>
            </h1>

            <p className={styles.heroDescription}>
              Somos una organización comprometida con el rescate, cuidado y
              búsqueda de hogares responsables para animales que necesitan una
              segunda oportunidad.
            </p>

            <div className={styles.heroActions}>
              <Link href="/animals" className={styles.primaryButton}>
                Conocé a nuestros animales
                <FaArrowRight />
              </Link>

              <Link href="/adopcion" className={styles.secondaryButton}>
                Quiero adoptar
              </Link>
            </div>
          </div>

          {/* Espacio para imagen de la chica */}
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageFrame}>
              <div className={styles.imagePlaceholder}>
                <FaPaw />
                <span>Imagen de la fundadora</span>
              </div>

              <Image
                src="https://res.cloudinary.com/diefdex1h/image/upload/v1786477622/ChatGPT_Image_11_ago_2026_04_46_47_p.m._awwq0x.png"
                alt="Fundadora de EPA junto a un animal rescatado"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 50vw"
                className={styles.heroImage}
              />
            </div>

            <div className={styles.imageDecoration}>
              <FaHeart />
            </div>

            <div className={styles.imageNote}>
              <FaPaw />
              <span>Cada vida importa</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          INTRO
      ========================================= */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.introLabel}>
              <span>01</span>
              <div />
              <p>Quiénes somos</p>
            </div>

            <div className={styles.introContent}>
              <h2>
                No se trata solamente de rescatar.
                <br />
                <em>Se trata de cambiar vidas.</em>
              </h2>

              <p>
                En EPA creemos que cada animal merece una oportunidad de conocer
                el amor, la seguridad y la tranquilidad de un hogar.
              </p>

              <p>
                Nuestro trabajo comienza muchas veces en situaciones difíciles:
                animales abandonados, heridos o en condiciones de vulnerabilidad
                que necesitan atención y cuidado.
              </p>

              <p>
                Pero el rescate es solamente el primer paso. Los acompañamos
                durante su recuperación y trabajamos para encontrar una familia
                responsable donde puedan comenzar una nueva etapa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          MISIÓN
      ========================================= */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>
              <FaHeart />
              Nuestra misión
            </span>

            <h2 className={styles.sectionTitle}>
              Darles una segunda oportunidad
              <br />
              <em>y construir un futuro mejor.</em>
            </h2>
          </div>

          <div className={styles.missionGrid}>
            <article className={styles.missionCard}>
              <div className={styles.cardIcon}>
                <FaPaw />
              </div>

              <span>01</span>

              <h3>Rescatar</h3>

              <p>
                Brindar ayuda a animales que se encuentran en situaciones de
                abandono, vulnerabilidad o riesgo.
              </p>
            </article>

            <article className={styles.missionCard}>
              <div className={styles.cardIcon}>
                <FaShieldAlt />
              </div>

              <span>02</span>

              <h3>Recuperar</h3>

              <p>
                Acompañarlos durante su recuperación, proporcionando los
                cuidados necesarios para que puedan volver a estar bien.
              </p>
            </article>

            <article className={styles.missionCard}>
              <div className={styles.cardIcon}>
                <FaHome />
              </div>

              <span>03</span>

              <h3>Encontrar hogar</h3>

              <p>
                Buscar familias responsables que puedan ofrecerles amor,
                estabilidad y una vida digna.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================
          HISTORIA / FOTO
      ========================================= */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyImage}>
              <div className={styles.storyImagePlaceholder}>
                <FaPaw />
                <span>Espacio para fotografía</span>
              </div>

              <Image
                src="https://res.cloudinary.com/diefdex1h/image/upload/v1786477622/ChatGPT_Image_11_ago_2026_04_46_47_p.m._awwq0x.png"
                alt="Fundadora de EPA junto a un animal rescatado"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 50vw"
                className={styles.heroImage}
              />
            </div>

            <div className={styles.storyContent}>
              <span className={styles.eyebrow}>
                <FaPaw />
                Nuestra historia
              </span>

              <h2>
                Una historia construida
                <br />
                <em>con compromiso.</em>
              </h2>

              <p>
                EPA nació a partir de una necesidad muy concreta: ayudar a
                animales que no tenían a quién recurrir.
              </p>

              <p>
                Con el tiempo, lo que comenzó como una forma de ayudar se fue
                convirtiendo en un compromiso mucho más grande. Cada rescate,
                cada recuperación y cada adopción nos recuerda por qué hacemos
                esto.
              </p>

              <p>
                Hoy seguimos trabajando para que más animales puedan dejar atrás
                una historia difícil y comenzar una nueva junto a una familia.
              </p>

              <div className={styles.storyQuote}>
                <FaHeart />

                <blockquote>
                  "Una segunda oportunidad puede cambiar toda una vida."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          VALORES
      ========================================= */}
      {/* =========================================
    VALORES
========================================= */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.valuesHeader}>
            <span className={styles.eyebrow}>
              <FaHeart />
              Lo que nos mueve
            </span>
            <h2 className={styles.valuesTitle}>
              Nuestros <span>valores</span>
            </h2>
            <p className={styles.valuesDescription}>
              Todo lo que hacemos parte de una idea simple: cuidar, respetar y
              defender la vida.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            <article className={styles.valueCard}>
              <div className={styles.valueCardIcon}>
                <FaHeart />
              </div>
              <div className={styles.valueCardContent}>
                <span className={styles.valueCardNumber}>01</span>
                <h3>Amor</h3>
                <p>
                  Porque el cuidado también se construye desde el vínculo, la
                  empatía y el respeto.
                </p>
              </div>
            </article>

            <article className={styles.valueCard}>
              <div className={styles.valueCardIcon}>
                <FaHandsHelping />
              </div>
              <div className={styles.valueCardContent}>
                <span className={styles.valueCardNumber}>02</span>
                <h3>Compromiso</h3>
                <p>
                  Cada animal que llega a nosotros merece que hagamos todo lo
                  posible por ayudarlo.
                </p>
              </div>
            </article>

            <article className={styles.valueCard}>
              <div className={styles.valueCardIcon}>
                <FaShieldAlt />
              </div>
              <div className={styles.valueCardContent}>
                <span className={styles.valueCardNumber}>03</span>
                <h3>Responsabilidad</h3>
                <p>
                  Promovemos adopciones conscientes y familias preparadas para
                  asumir un compromiso para toda la vida.
                </p>
              </div>
            </article>

            <article className={styles.valueCard}>
              <div className={styles.valueCardIcon}>
                <FaUsers />
              </div>
              <div className={styles.valueCardContent}>
                <span className={styles.valueCardNumber}>04</span>
                <h3>Comunidad</h3>
                <p>
                  Sabemos que transformar realidades es posible cuando muchas
                  personas se comprometen con la misma causa.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================
          PROCESO
      ========================================= */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.processHeader}>
            <span className={styles.eyebrow}>
              <FaPaw />
              Nuestro trabajo
            </span>

            <h2 className={styles.sectionTitle}>
              Del rescate
              <br />
              <em>a un nuevo hogar.</em>
            </h2>
          </div>

          <div className={styles.process}>
            <div className={styles.processItem}>
              <div className={styles.processNumber}>01</div>

              <FaPaw className={styles.processIcon} />

              <div>
                <h3>Rescate</h3>
                <p>
                  Detectamos situaciones donde un animal necesita ayuda y
                  trabajamos para ponerlo a salvo.
                </p>
              </div>
            </div>

            <div className={styles.processLine} />

            <div className={styles.processItem}>
              <div className={styles.processNumber}>02</div>

              <FaHeart className={styles.processIcon} />

              <div>
                <h3>Recuperación</h3>
                <p>
                  Recibe los cuidados necesarios y el acompañamiento que
                  necesita para recuperarse.
                </p>
              </div>
            </div>

            <div className={styles.processLine} />

            <div className={styles.processItem}>
              <div className={styles.processNumber}>03</div>

              <FaHome className={styles.processIcon} />

              <div>
                <h3>Adopción</h3>
                <p>
                  Buscamos una familia responsable que pueda convertirse en su
                  hogar definitivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          NÚMEROS
      ========================================= */}
      {/* =========================================
    NÚMEROS - ESTADÍSTICAS
========================================= */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsHeader}>
            <span className={styles.eyebrow}>
              <FaHeart />
              Nuestro impacto
            </span>
            <h2 className={styles.statsTitle}>
              Historias que <span>hablan por sí solas</span>
            </h2>
            <p className={styles.statsDescription}>
              Cada número representa una vida que cambió para siempre.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaPaw />
              </div>
              <div className={styles.statInfo}>
                <strong>150+</strong>
                <span>Animales rescatados</span>
                <p>Y contando, cada día sumamos uno más</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaHeart />
              </div>
              <div className={styles.statInfo}>
                <strong>6+</strong>
                <span>Años de compromiso</span>
                <p>Trabajando sin descanso por ellos</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaHome />
              </div>
              <div className={styles.statInfo}>
                <strong>100+</strong>
                <span>Historias con final feliz</span>
                <p>Animales que encontraron un hogar</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaUsers />
              </div>
              <div className={styles.statInfo}>
                <strong>∞</strong>
                <span>Personas que ayudan</span>
                <p>Porque juntos podemos más</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================= */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaDecoration}>
          <FaPaw />
        </div>

        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <span className={styles.eyebrow}>
              <FaHeart />
              Vos también podés ser parte
            </span>

            <h2>
              Una vida puede cambiar
              <br />
              <em>con una decisión.</em>
            </h2>

            <p>
              Hay muchas formas de ayudar. Podés adoptar, colaborar o
              simplemente compartir la historia de un animal que está buscando
              un hogar.
            </p>

            <div className={styles.ctaActions}>
              <Link href="/adopcion" className={styles.primaryButton}>
                Quiero adoptar
                <FaArrowRight />
              </Link>

              <Link href="/animals" className={styles.secondaryButton}>
                Ver animales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
