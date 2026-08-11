/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaPaw,
  FaHeart,
  FaSyringe,
  FaShieldAlt,
  FaDog,
  FaCat,
  FaChild,
  FaRuler,
  FaWeight,
  FaCalendarAlt,
  FaVenusMars,
} from "react-icons/fa";

import { getAnimal } from "@/lib/actions/animals/getAnimal";

import styles from "./AnimalDetailPage.module.css";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AnimalDetailPage({ params }: Props) {
  const { id } = await params;

  const animal = await getAnimal(id);

  if (!animal) {
    notFound();
  }

  const portada = animal.animal_media?.find(
    (media: { es_portada: any }) => media.es_portada,
  );

  const imageUrl = portada
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animals/${portada.storage_path}`
    : null;

  const edad =
    animal.edad_anos !== null && animal.edad_anos !== undefined
      ? `${animal.edad_anos} ${animal.edad_anos === 1 ? "año" : "años"}`
      : animal.edad_meses !== null && animal.edad_meses !== undefined
        ? `${animal.edad_meses} ${animal.edad_meses === 1 ? "mes" : "meses"}`
        : "Edad desconocida";

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Disponible":
        return styles.available;
      case "Reservado":
        return styles.reserved;
      case "Adoptado":
        return styles.adopted;
      default:
        return "";
    }
  };

  const getStatusEmoji = (estado: string) => {
    switch (estado) {
      case "Disponible":
        return "🐾";
      case "Reservado":
        return "⏳";
      case "Adoptado":
        return "🏠";
      default:
        return "";
    }
  };

  const getSexoDisplay = (sexo: string) => {
    return sexo === "Macho" ? "♂ Macho" : "♀ Hembra";
  };

  const getSexoIcon = (sexo: string) => {
    return sexo === "Macho" ? "♂" : "♀";
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Volver */}
        <Link href="/animals" className={styles.backLink}>
          <FaArrowLeft />
          Volver a animales
        </Link>

        {/* Ficha principal */}
        <section className={styles.hero}>
          {/* Imagen */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`${animal.nombre} - ${animal.especie} en adopción`}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 55vw"
                  className={styles.image}
                  quality={90}
                />
              ) : (
                <div className={styles.noImage}>
                  <FaPaw />
                  <span>Sin imagen disponible</span>
                </div>
              )}

              {animal.destacado && (
                <span className={styles.featured}>
                  <FaHeart />
                  Destacado
                </span>
              )}

              <span
                className={`${styles.statusBadge} ${getStatusColor(animal.estado)}`}
              >
                {getStatusEmoji(animal.estado)} {animal.estado}
              </span>
            </div>
          </div>

          {/* Información */}
          <div className={styles.info}>
            <div className={styles.eyebrow}>
              <FaPaw />
              En adopción
            </div>

            <h1 className={styles.title}>{animal.nombre}</h1>

            <p className={styles.intro}>
              {animal.especie}
              {animal.raza ? ` · ${animal.raza}` : ""}
            </p>

            <div className={styles.divider} />

            {/* Datos rápidos */}
            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>
                  <FaCalendarAlt />
                  Edad
                </span>
                <strong>{edad}</strong>
              </div>

              <div className={styles.detail}>
                <span className={styles.detailLabel}>
                  <FaVenusMars />
                  Sexo
                </span>
                <strong>
                  <span className={styles.sexoIcon}>
                    {getSexoIcon(animal.sexo)}
                  </span>
                  {getSexoDisplay(animal.sexo)}
                </strong>
              </div>

              <div className={styles.detail}>
                <span className={styles.detailLabel}>
                  <FaRuler />
                  Tamaño
                </span>
                <strong>{animal.tamano ?? "No especificado"}</strong>
              </div>

              <div className={styles.detail}>
                <span className={styles.detailLabel}>
                  <FaWeight />
                  Peso
                </span>
                <strong>
                  {animal.peso ? `${animal.peso} kg` : "No especificado"}
                </strong>
              </div>
            </div>

            <div className={styles.divider} />

            {/* CTA */}
            <Link
              href={`/adopcion?animal=${animal.id}`}
              className={styles.adoptButton}
            >
              <FaHeart />
              Quiero adoptar a {animal.nombre}
            </Link>

            {animal.estado === "Reservado" && (
              <div className={styles.reservedMessage}>
                <span className={styles.messageIcon}>⏳</span>
                <div>
                  <strong>Reservado</strong>
                  <p>Este animal se encuentra reservado actualmente.</p>
                </div>
              </div>
            )}

            {animal.estado === "Adoptado" && (
              <div className={styles.adoptedMessage}>
                <span className={styles.messageIcon}>🏠</span>
                <div>
                  <strong>¡Adoptado!</strong>
                  <p>{animal.nombre} ya encontró un hogar ❤️</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Historia */}
        {animal.historia && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span>📖 Su historia</span>
              <FaPaw />
            </div>

            <div className={styles.story}>
              <p>{animal.historia}</p>
            </div>
          </section>
        )}

        {/* Características */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span>❤️ Conocé a {animal.nombre}</span>
            <FaHeart />
          </div>

          <div className={styles.features}>
            {animal.vacunado && (
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaSyringe />
                </div>
                <span>Vacunado</span>
              </div>
            )}

            {animal.castrado && (
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaShieldAlt />
                </div>
                <span>Castrado</span>
              </div>
            )}

            {animal.desparasitado && (
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaPaw />
                </div>
                <span>Desparasitado</span>
              </div>
            )}

            {animal.compatible_ninos && (
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaChild />
                </div>
                <span>Compatible con niños</span>
              </div>
            )}

            {animal.compatible_perros && (
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaDog />
                </div>
                <span>Compatible con perros</span>
              </div>
            )}

            {animal.compatible_gatos && (
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaCat />
                </div>
                <span>Compatible con gatos</span>
              </div>
            )}
          </div>

          {!animal.vacunado &&
            !animal.castrado &&
            !animal.desparasitado &&
            !animal.compatible_ninos &&
            !animal.compatible_perros &&
            !animal.compatible_gatos && (
              <p className={styles.noFeatures}>
                No hay características adicionales registradas para{" "}
                {animal.nombre}.
              </p>
            )}
        </section>

        {/* Observaciones */}
        {animal.observaciones && (
          <section className={styles.observations}>
            <span>⚠️ Importante</span>
            <p>{animal.observaciones}</p>
          </section>
        )}

        {/* CTA final */}
        {animal.estado === "Disponible" && (
          <section className={styles.finalCta}>
            <FaHeart className={styles.finalIcon} />

            <div>
              <h2>¿Podés ser vos su nuevo hogar?</h2>
              <p>
                Cada adopción cambia una vida. Completá el formulario y empezá
                el proceso para conocer a {animal.nombre}.
              </p>
            </div>

            <Link
              href={`/adopcion?animal=${animal.id}`}
              className={styles.finalButton}
            >
              Quiero adoptar
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
