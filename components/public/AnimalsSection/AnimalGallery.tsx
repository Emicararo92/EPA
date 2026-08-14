"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import styles from "./AnimalGallery.module.css";

type Media = {
  id: string;
  storage_path: string;
  es_portada: boolean;
  orden: number;
};

type Props = {
  images: Media[];
  animalName: string;
};

export default function AnimalGallery({ images, animalName }: Props) {
  const [current, setCurrent] = useState(0);

  if (!images.length) {
    return (
      <div className={styles.empty}>
        <span>🐾</span>
        <p>Sin imagen disponible</p>
      </div>
    );
  }

  const orderedImages = [...images].sort((a, b) => a.orden - b.orden);

  const imageUrl = (path: string) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animals/${path}`;

  const previous = () => {
    setCurrent((prev) => (prev === 0 ? orderedImages.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === orderedImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image
          src={imageUrl(orderedImages[current].storage_path)}
          alt={`${animalName} - foto ${current + 1}`}
          fill
          priority={current === 0}
          sizes="(max-width: 900px) 100vw, 55vw"
          className={styles.image}
        />

        {orderedImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={previous}
              className={`${styles.arrow} ${styles.left}`}
              aria-label="Imagen anterior"
            >
              <FaChevronLeft />
            </button>

            <button
              type="button"
              onClick={next}
              className={`${styles.arrow} ${styles.right}`}
              aria-label="Imagen siguiente"
            >
              <FaChevronRight />
            </button>

            <div className={styles.counter}>
              {current + 1} / {orderedImages.length}
            </div>
          </>
        )}
      </div>

      {orderedImages.length > 1 && (
        <div className={styles.thumbnails}>
          {orderedImages.map((image, index) => (
            <button
              type="button"
              key={image.id}
              onClick={() => setCurrent(index)}
              className={`${styles.thumbnail} ${
                index === current ? styles.active : ""
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image
                src={imageUrl(image.storage_path)}
                alt=""
                fill
                sizes="100px"
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
