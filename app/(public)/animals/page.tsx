/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import {
  FaPaw,
  FaHeart,
  FaArrowRight,
  FaCalendarAlt,
  FaVenusMars,
  FaRuler,
  FaDog,
  FaCat,
} from "react-icons/fa";

import { getPublishedAnimals } from "@/lib/actions/animals/getPublishedAnimals";

import styles from "./AnimalsPage.module.css";

export default async function AnimalsPage() {
  const animals = await getPublishedAnimals();

  const getEspecieEmoji = (especie: string) => {
    if (especie === "Perro") return "🐶";
    if (especie === "Gato") return "🐱";
    return "🐾";
  };

  const getStatusInfo = (estado: string) => {
    switch (estado) {
      case "Disponible":
        return { label: "Disponible", emoji: "✓", class: styles.available };
      case "Reservado":
        return { label: "Reservado", emoji: "⏳", class: styles.reserved };
      case "Adoptado":
        return { label: "Adoptado", emoji: "🏠", class: styles.adopted };
      default:
        return { label: estado, emoji: "", class: "" };
    }
  };

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaPaw />
            <span>Adopción responsable</span>
          </div>

          <h1 className={styles.heroTitle}>
            Encontrá a tu <span>nuevo</span>
            <br />
            <span className={styles.highlight}>compañero</span>
          </h1>

          <div className={styles.heroDivider} />

          <p className={styles.heroDescription}>
            Conocé a los animales que están esperando una familia. Todos fueron
            rescatados y están listos para encontrar un hogar responsable.
          </p>

          {animals.length > 0 && (
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{animals.length}</span>
                <span className={styles.heroStatLabel}>
                  {animals.length === 1 ? "animal espera" : "animales esperan"}
                </span>
                <span className={styles.heroStatSub}>un hogar</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.heroWave} />
      </section>

      {/* Animales */}
      <section className={styles.animalsSection} id="animales">
        <div className={styles.container}>
          {animals.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIconWrapper}>
                <FaPaw className={styles.emptyIcon} />
              </div>
              <h2>No hay animales disponibles</h2>
              <p>
                En este momento no tenemos animales publicados para adopción.
                Volvé a visitarnos pronto.
              </p>
            </div>
          ) : (
            <>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeaderLeft}>
                  <span className={styles.sectionEyebrow}>✦ Conocelos</span>
                  <h2 className={styles.sectionTitle}>
                    Ellos te están <span>esperando</span>
                  </h2>
                </div>
                <div className={styles.sectionHeaderRight}>
                  <span className={styles.counter}>
                    <span className={styles.counterNumber}>
                      {animals.length}
                    </span>
                    <span className={styles.counterLabel}>
                      {animals.length === 1 ? "animal" : "animales"}
                    </span>
                  </span>
                </div>
              </div>

              <div className={styles.grid}>
                {animals.map((animal) => {
                  const portada = animal.animal_media?.find(
                    (media) => media.es_portada,
                  );

                  const imageUrl = portada
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animals/${portada.storage_path}`
                    : null;

                  const especieEmoji = getEspecieEmoji(animal.especie);
                  const statusInfo = getStatusInfo(animal.estado);
                  const sexoIcon = animal.sexo === "Macho" ? "♂" : "♀";

                  return (
                    <Link
                      key={animal.id}
                      href={`/animals/${animal.id}`}
                      className={styles.card}
                    >
                      <div className={styles.cardImageWrapper}>
                        <div className={styles.cardImage}>
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={`${animal.nombre} - ${animal.especie}`}
                              fill
                              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                              className={styles.image}
                              quality={85}
                            />
                          ) : (
                            <div className={styles.noImage}>
                              <span className={styles.noImageEmoji}>
                                {especieEmoji}
                              </span>
                              <span className={styles.noImageText}>
                                Sin imagen
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Badges */}
                        <div className={styles.cardBadges}>
                          <span
                            className={`${styles.status} ${statusInfo.class}`}
                          >
                            <span className={styles.statusEmoji}>
                              {statusInfo.emoji}
                            </span>
                            {statusInfo.label}
                          </span>
                          {animal.destacado && (
                            <span className={styles.featured}>
                              <FaHeart className={styles.featuredIcon} />
                              Destacado
                            </span>
                          )}
                        </div>
                      </div>

                      <div className={styles.cardBody}>
                        <div className={styles.cardHeader}>
                          <div>
                            <h3 className={styles.cardName}>{animal.nombre}</h3>
                            <span className={styles.cardSpecies}>
                              {especieEmoji} {animal.especie}
                            </span>
                          </div>
                          <div className={styles.cardArrow}>
                            <FaArrowRight />
                          </div>
                        </div>

                        <div className={styles.cardDetails}>
                          {animal.edad && (
                            <span className={styles.cardDetail}>
                              <FaCalendarAlt
                                className={styles.cardDetailIcon}
                              />
                              {animal.edad}
                            </span>
                          )}
                          {animal.sexo && (
                            <span className={styles.cardDetail}>
                              <FaVenusMars className={styles.cardDetailIcon} />
                              {sexoIcon}
                            </span>
                          )}
                          {animal.tamano && (
                            <span className={styles.cardDetail}>
                              <FaRuler className={styles.cardDetailIcon} />
                              {animal.tamano}
                            </span>
                          )}
                        </div>

                        <div className={styles.cardFooter}>
                          <span className={styles.cardButton}>
                            Conocer a {animal.nombre}
                            <FaArrowRight className={styles.cardButtonIcon} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Ver más */}
              {animals.length > 6 && (
                <div className={styles.viewMore}>
                  <Link
                    href="/animales/todos"
                    className={styles.viewMoreButton}
                  >
                    Ver todos los animales
                    <FaArrowRight />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      {animals.length > 0 && (
        <section className={styles.cta}>
          <div className={styles.ctaContainer}>
            <div className={styles.ctaContent}>
              <div className={styles.ctaIconWrapper}>
                <FaHeart className={styles.ctaIcon} />
              </div>
              <h2 className={styles.ctaTitle}>
                ¿Listo para dar el <span>paso</span>?
              </h2>
              <p className={styles.ctaDescription}>
                Adoptar es darle una segunda oportunidad a una vida. Ellos solo
                necesitan una oportunidad y vos podés dársela.
              </p>
              <Link href="/adopcion" className={styles.ctaButton}>
                Quiero adoptar
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
