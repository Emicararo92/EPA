/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import {
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaDog,
  FaCat,
  FaPaw,
} from "react-icons/fa";
import DeleteAnimalButton from "@/components/admin/animals/DeleteAnimalButton";
import { getAnimals } from "@/lib/actions/animals/getAnimals";
import styles from "./AdminAnimalsPage.module.css";

export default async function AdminAnimalsPage() {
  const animals = await getAnimals();

  const getEspecieIcon = (especie: string) => {
    if (especie === "Perro") return <FaDog className={styles.especieIcon} />;
    if (especie === "Gato") return <FaCat className={styles.especieIcon} />;
    return <FaPaw className={styles.especieIcon} />;
  };

  return (
    <main className={styles.main}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Animales</h1>
          <p className={styles.subtitle}>
            Gestión de animales registrados en EPA
          </p>
        </div>
        <Link href="/admin/animals/new" className={styles.btnPrimary}>
          <FaPlus className={styles.btnIcon} />
          Nuevo Animal
        </Link>
      </div>

      {/* TABLA */}
      {animals.length === 0 ? (
        <div className={styles.emptyState}>
          <FaPaw className={styles.emptyIcon} />
          <p>No hay animales registrados.</p>
          <Link href="/admin/animals/new" className={styles.btnPrimary}>
            <FaPlus className={styles.btnIcon} />
            Crear primer animal
          </Link>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Especie</th>
                <th>Estado</th>
                <th>Publicado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => {
                const portada = animal.animal_media?.find(
                  (media: { es_portada: boolean; storage_path: string }) =>
                    media.es_portada,
                );

                const imageUrl = portada
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animals/${portada.storage_path}`
                  : null;

                return (
                  <tr key={animal.id}>
                    <td>
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={animal.nombre}
                          width={48}
                          height={48}
                          loading="eager"
                          className={styles.animalImage}
                        />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <FaPaw className={styles.placeholderIcon} />
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={styles.animalName}>{animal.nombre}</span>
                    </td>
                    <td>
                      <span className={styles.especieBadge}>
                        {getEspecieIcon(animal.especie)}
                        {animal.especie}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles[`badge${animal.estado}`]}`}
                      >
                        {animal.estado}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${animal.publicado ? styles.badgePublicado : styles.badgeBorrador}`}
                      >
                        {animal.publicado ? "Publicado" : "Borrador"}
                      </span>
                    </td>
                    <td>
                      <span className={styles.dateText}>
                        {new Date(animal.created_at).toLocaleDateString(
                          "es-AR",
                        )}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Link
                          href={`/admin/animals/${animal.id}`}
                          className={styles.actionEdit}
                        >
                          <FaEdit />
                        </Link>
                        <DeleteAnimalButton id={animal.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
