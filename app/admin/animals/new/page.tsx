/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaPaw, FaDog, FaCat } from "react-icons/fa";
import Link from "next/link";
import { createAnimal } from "../../../../lib/actions/animals/createAnimal";
import styles from "./NewAnimalPage.module.css";

export default function NewAnimalPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createAnimal(formData);
      router.push("/admin/animals");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar el animal");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Link href="/admin/animals" className={styles.backLink}>
            <FaArrowLeft className={styles.backIcon} />
            Volver
          </Link>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <FaPaw className={styles.headerIcon} />
              </div>
              <div>
                <h1 className={styles.title}>Nuevo Animal</h1>
                <p className={styles.subtitle}>
                  Completa los datos para registrar un nuevo animal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form action={handleSubmit} className={styles.formWrapper}>
          {/* Fila 1: Nombre y Especie */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ej: Luna"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="especie">Especie *</label>
              <select id="especie" name="especie" required>
                <option value="Perro">🐶 Perro</option>
                <option value="Gato">🐱 Gato</option>
                <option value="Otro">🐾 Otro</option>
              </select>
            </div>
          </div>

          {/* Fila 2: Raza y Edad */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="raza">Raza</label>
              <input
                type="text"
                id="raza"
                name="raza"
                placeholder="Ej: Labrador"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="edad">Edad</label>
              <select id="edad" name="edad" defaultValue="Adulto">
                <option value="Cachorro">Cachorro</option>
                <option value="Joven">Joven</option>
                <option value="Adulto">Adulto</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          {/* Fila 3: Sexo y Tamaño */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="sexo">Sexo *</label>
              <select id="sexo" name="sexo" required>
                <option value="Macho">♂ Macho</option>
                <option value="Hembra">♀ Hembra</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="tamano">Tamaño</label>
              <select id="tamano" name="tamano" defaultValue="Mediano">
                <option value="Pequeño">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
          </div>

          {/* Fila 4: Peso y Fecha de Rescate */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="peso">Peso (kg)</label>
              <input
                type="number"
                id="peso"
                name="peso"
                step="0.1"
                placeholder="Ej: 12.5"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="fecha_rescate">Fecha de Rescate</label>
              <input type="date" id="fecha_rescate" name="fecha_rescate" />
            </div>
          </div>

          {/* Fila 5: Estado, Publicado y Destacado */}
          <div className={styles.rowThree}>
            <div className={styles.field}>
              <label htmlFor="estado">Estado *</label>
              <select id="estado" name="estado" required>
                <option value="Disponible">Disponible</option>
                <option value="Reservado">Reservado</option>
                <option value="Adoptado">Adoptado</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="publicado">Publicado</label>
              <select id="publicado" name="publicado">
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="destacado">Destacado</label>
              <select id="destacado" name="destacado" defaultValue="false">
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          {/* Fila 6: Imagen */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="imagen">Imagen *</label>
              <input
                type="file"
                id="imagen"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {previewImage && (
                <div className={styles.imagePreview}>
                  <Image
                    src={previewImage}
                    alt="Vista previa"
                    width={120}
                    height={120}
                    className={styles.previewImage}
                  />
                </div>
              )}
            </div>
            <div className={styles.field}>
              {/* Espacio vacío para mantener la cuadrícula */}
            </div>
          </div>

          {/* Fila 7: Historia */}
          <div className={styles.rowFull}>
            <div className={styles.field}>
              <label htmlFor="historia">Historia</label>
              <textarea
                id="historia"
                name="historia"
                rows={4}
                placeholder="Cuéntanos la historia de este animal..."
              />
            </div>
          </div>

          {/* Fila 8: Observaciones */}
          <div className={styles.rowFull}>
            <div className={styles.field}>
              <label htmlFor="observaciones">Observaciones</label>
              <textarea
                id="observaciones"
                name="observaciones"
                rows={3}
                placeholder="Observaciones adicionales..."
              />
            </div>
          </div>

          {/* Fila 9: Características */}
          <div className={styles.rowFull}>
            <label className={styles.checkboxLabel}>Características</label>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="vacunado" />
                Vacunado
              </label>
              <label>
                <input type="checkbox" name="castrado" />
                Castrado
              </label>
              <label>
                <input type="checkbox" name="desparasitado" />
                Desparasitado
              </label>
              <label>
                <input type="checkbox" name="compatible_ninos" />
                Compatible con niños
              </label>
              <label>
                <input type="checkbox" name="compatible_perros" />
                Compatible con perros
              </label>
              <label>
                <input type="checkbox" name="compatible_gatos" />
                Compatible con gatos
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? "Guardando..." : "Crear Animal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
