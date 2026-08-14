"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaPaw, FaTimes } from "react-icons/fa";

import { createAnimal } from "../../../../lib/actions/animals/createAnimal";

import styles from "./NewAnimalPage.module.css";

export default function NewAnimalPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

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
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      setPreviewImages([]);
      return;
    }

    if (files.length > 5) {
      alert("Podés seleccionar un máximo de 5 imágenes.");

      e.target.value = "";
      setPreviewImages([]);

      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages(previews);
  };

  const removePreview = (index: number, inputId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement | null;

    if (!input?.files) {
      return;
    }

    const files = Array.from(input.files).filter(
      (_, fileIndex) => fileIndex !== index,
    );

    const dataTransfer = new DataTransfer();

    files.forEach((file) => {
      dataTransfer.items.add(file);
    });

    input.files = dataTransfer.files;

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages(previews);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
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
                  Completá los datos para registrar un nuevo animal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULARIO */}
        <form action={handleSubmit} className={styles.formWrapper}>
          {/* FILA 1 */}
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

              <select id="especie" name="especie" defaultValue="Perro" required>
                <option value="Perro">🐶 Perro</option>

                <option value="Gato">🐱 Gato</option>
              </select>
            </div>
          </div>

          {/* FILA 2 */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="raza">Raza</label>

              <input
                type="text"
                id="raza"
                name="raza"
                placeholder="Ej: Mestizo"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="edad">Edad *</label>

              <select id="edad" name="edad" defaultValue="Adulto" required>
                <option value="Cachorro">Cachorro</option>

                <option value="Joven">Joven</option>

                <option value="Adulto">Adulto</option>

                <option value="Adulto mayor">Adulto mayor</option>
              </select>
            </div>
          </div>

          {/* FILA 3 */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="sexo">Sexo *</label>

              <select id="sexo" name="sexo" defaultValue="Macho" required>
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

          {/* FILA 4 */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="peso">Peso (kg)</label>

              <input
                type="number"
                id="peso"
                name="peso"
                step="0.1"
                min="0"
                placeholder="Ej: 12.5"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="fecha_rescate">Fecha de Rescate</label>

              <input type="date" id="fecha_rescate" name="fecha_rescate" />
            </div>
          </div>

          {/* FILA 5 */}
          <div className={styles.rowThree}>
            <div className={styles.field}>
              <label htmlFor="estado">Estado *</label>

              <select
                id="estado"
                name="estado"
                defaultValue="Disponible"
                required
              >
                <option value="Disponible">Disponible</option>

                <option value="Reservado">Reservado</option>

                <option value="En recuperación">En recuperación</option>

                <option value="En tránsito">En tránsito</option>

                <option value="Adoptado">Adoptado</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="publicado">Publicado</label>

              <select id="publicado" name="publicado" defaultValue="true">
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

          {/* IMÁGENES */}
          <div className={styles.rowFull}>
            <div className={styles.field}>
              <label htmlFor="images">Imágenes *</label>

              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                required
                onChange={handleImageChange}
              />

              <small
                style={{
                  display: "block",
                  marginTop: 8,
                  opacity: 0.7,
                }}
              >
                Podés seleccionar hasta 5 imágenes. La primera será la portada
                del animal.
              </small>

              {/* PREVIEWS */}
              {previewImages.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: 16,
                    marginTop: 20,
                  }}
                >
                  {previewImages.map((preview, index) => (
                    <div
                      key={preview}
                      style={{
                        position: "relative",
                        borderRadius: 12,
                        overflow: "hidden",
                        border:
                          index === 0 ? "3px solid #222" : "1px solid #ddd",
                        aspectRatio: "1 / 1",
                      }}
                    >
                      <Image
                        src={preview}
                        alt={`Vista previa ${index + 1}`}
                        fill
                        sizes="150px"
                        style={{
                          objectFit: "cover",
                        }}
                      />

                      {/* PORTADA */}
                      {index === 0 && (
                        <span
                          style={{
                            position: "absolute",
                            left: 8,
                            bottom: 8,
                            padding: "5px 8px",
                            borderRadius: 6,
                            background: "rgba(0,0,0,0.75)",
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Portada
                        </span>
                      )}

                      {/* ELIMINAR */}
                      <button
                        type="button"
                        onClick={() => removePreview(index, "images")}
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          width: 30,
                          height: 30,
                          border: 0,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          background: "rgba(0,0,0,0.75)",
                          color: "#fff",
                        }}
                        aria-label={`Eliminar imagen ${index + 1}`}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* HISTORIA */}
          <div className={styles.rowFull}>
            <div className={styles.field}>
              <label htmlFor="historia">Historia</label>

              <textarea
                id="historia"
                name="historia"
                rows={4}
                placeholder="Contanos la historia de este animal..."
              />
            </div>
          </div>

          {/* OBSERVACIONES */}
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

          {/* CARACTERÍSTICAS */}
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

          {/* BOTONES */}
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
