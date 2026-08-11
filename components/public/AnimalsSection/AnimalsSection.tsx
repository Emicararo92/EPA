import Image from "next/image";
import Link from "next/link";

import { getPublishedAnimals } from "@/lib/actions/animals/getPublishedAnimals";

import styles from "./AnimalsSection.module.css";

export default async function AnimalsSection() {
  const animals = await getPublishedAnimals();

  const visibleAnimals = animals.slice(0, 3);

  return (
    <section className={styles.section}>
      {/* Banner de fondo */}
      <div className={styles.background}>
        <Image
          src="https://res.cloudinary.com/diefdex1h/image/upload/v1786469349/ChatGPT_Image_11_ago_2026_02_28_53_p.m._g6sfca.png"
          alt="Animales rescatados buscando un hogar"
          fill
          priority
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>

      {/* Curva */}
      <div className={styles.curve} />

      <div className={styles.content}>
        <div className={styles.container}>
          {/* Texto */}
          <div className={styles.intro}>
            <div className={styles.heart}>♡</div>

            <span className={styles.eyebrow}>Animales que buscan hogar</span>

            <h2 className={styles.title}>
              Ellos están listos
              <br />
              para ser parte
              <br />
              de tu familia.
            </h2>

            <p className={styles.description}>
              Todos nuestros animales están rescatados, cuidados con amor y
              listos para encontrar un hogar responsable.
            </p>

            <Link href="/animals" className={styles.allButton}>
              CONOCÉ A TODOS
            </Link>
          </div>

          {/* Animales */}
          <div className={styles.animalsWrapper}>
            <div className={styles.animalsGrid}>
              {visibleAnimals.map((animal) => {
                const portada = animal.animal_media?.find(
                  (media) => media.es_portada,
                );

                const imageUrl = portada
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animals/${portada.storage_path}`
                  : null;

                return (
                  <Link
                    key={animal.id}
                    href={`/animals/${animal.id}`}
                    className={styles.card}
                  >
                    <div className={styles.cardImage}>
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={animal.nombre}
                          fill
                          sizes="(max-width: 768px) 80vw, 220px"
                          className={styles.animalImage}
                        />
                      ) : (
                        <div className={styles.noImage}>
                          <span>🐾</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.cardContent}>
                      <h3>{animal.nombre}</h3>

                      <p className={styles.meta}>
                        {animal.sexo}
                        <span>·</span>
                        {animal.edad}
                      </p>

                      {animal.raza && (
                        <span className={styles.tag}>{animal.raza}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Flecha */}
            <Link
              href="/animals"
              className={styles.nextButton}
              aria-label="Ver todos los animales"
            >
              →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
