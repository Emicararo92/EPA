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
} from "react-icons/fa";

import { getAnimal } from "@/lib/actions/animals/getAnimal";

import AnimalGallery from "../../../../components/public/AnimalsSection/AnimalGallery";

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

  const edad = animal.edad ?? "Edad desconocida";

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
          {/* Galería */}
          <div className={styles.imageColumn}>
            <AnimalGallery
              images={animal.animal_media ?? []}
              animalName={animal.nombre}
            />
          </div>

          {/* Información */}
          <div className={styles.info}>
            <div className={styles.eyebrow}>
              <FaPaw />
              En adopción
            </div>

            <h1 className={styles.title}>{animal.nombre}</h1>

            <div className={styles.status}>
              <span
                className={`${styles.statusDot} ${
                  animal.estado === "Disponible"
                    ? styles.available
                    : animal.estado === "Reservado"
                      ? styles.reserved
                      : styles.adopted
                }`}
              />

              {animal.estado}
            </div>

            <p className={styles.intro}>
              {animal.especie}
              {animal.raza ? ` · ${animal.raza}` : ""}
            </p>

            {/* Datos rápidos */}
            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Edad</span>

                <strong>{edad}</strong>
              </div>

              <div className={styles.detail}>
                <span className={styles.detailLabel}>Sexo</span>

                <strong>
                  {animal.sexo === "Macho" ? "♂ Macho" : "♀ Hembra"}
                </strong>
              </div>

              <div className={styles.detail}>
                <span className={styles.detailLabel}>Tamaño</span>

                <strong>{animal.tamano ?? "No especificado"}</strong>
              </div>

              <div className={styles.detail}>
                <span className={styles.detailLabel}>Peso</span>

                <strong>
                  {animal.peso ? `${animal.peso} kg` : "No especificado"}
                </strong>
              </div>
            </div>

            {/* CTA */}
            {animal.estado === "Disponible" && (
              <Link
                href={`/adopcion?animal=${animal.id}`}
                className={styles.adoptButton}
              >
                <FaHeart />
                Quiero adoptar a {animal.nombre}
              </Link>
            )}

            {animal.estado === "Reservado" && (
              <div className={styles.reservedMessage}>
                Este animal se encuentra reservado actualmente.
              </div>
            )}

            {animal.estado === "Adoptado" && (
              <div className={styles.adoptedMessage}>
                {animal.nombre} ya encontró un hogar ❤️
              </div>
            )}
          </div>
        </section>

        {/* Historia */}
        {animal.historia && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span>Su historia</span>
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
            <span>Conocé a {animal.nombre}</span>

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
        </section>

        {/* Observaciones */}
        {animal.observaciones && (
          <section className={styles.observations}>
            <span>Importante</span>

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
