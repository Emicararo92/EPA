"use client";

import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { deleteAnimal } from "@/lib/actions/animals/deleteAnimal";
import styles from "./DeleteAnimalButton.module.css";

type Props = {
  id: string;
};

export default function DeleteAnimalButton({ id }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar este animal? Esta acción no se puede deshacer.",
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      await deleteAnimal(id);
      // Opcional: refresh o redirect después de eliminar
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el animal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className={styles.deleteButton}
      aria-label="Eliminar animal"
    >
      {loading ? (
        <span className={styles.loadingText}>Eliminando...</span>
      ) : (
        <FaTrashAlt className={styles.icon} />
      )}
    </button>
  );
}
