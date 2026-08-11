"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./PostForm.module.css";

export type PostFormData = {
  titulo: string;
  tipo: "Noticia" | "Historia" | "Rescate";
  resumen: string;
  contenido: string;
  publicado: boolean;
  imagen: File | null;
};

type Props = {
  initialValues: PostFormData;
  submitText: string;
  action: (values: PostFormData) => Promise<void>;
};

export default function PostForm({ initialValues, submitText, action }: Props) {
  const router = useRouter();

  const [values, setValues] = useState<PostFormData>(initialValues);

  const [loading, setLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  function update<K extends keyof PostFormData>(
    field: K,
    value: PostFormData[K],
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      await action(values);

      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);

      alert("Error al guardar el post");
    } finally {
      setLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    update("imagen", file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Fila 1: Título y Tipo */}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="titulo">
            Título <span className={styles.required}>*</span>
          </label>

          <input
            id="titulo"
            type="text"
            placeholder="Ej: Nueva jornada de adopción"
            value={values.titulo}
            onChange={(e) => update("titulo", e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="tipo">
            Tipo <span className={styles.required}>*</span>
          </label>

          <select
            id="tipo"
            value={values.tipo}
            onChange={(e) =>
              update("tipo", e.target.value as PostFormData["tipo"])
            }
            required
          >
            <option value="Noticia">📰 Noticia</option>

            <option value="Historia">📖 Historia</option>

            <option value="Rescate">🆘 Rescate</option>
          </select>
        </div>
      </div>

      {/* Fila 2: Resumen */}

      <div className={styles.rowFull}>
        <div className={styles.field}>
          <label htmlFor="resumen">Resumen</label>

          <textarea
            id="resumen"
            placeholder="Breve descripción del post..."
            rows={3}
            value={values.resumen}
            onChange={(e) => update("resumen", e.target.value)}
          />
        </div>
      </div>

      {/* Fila 3: Contenido */}

      <div className={styles.rowFull}>
        <div className={styles.field}>
          <label htmlFor="contenido">
            Contenido <span className={styles.required}>*</span>
          </label>

          <textarea
            id="contenido"
            placeholder="Desarrollo completo del post..."
            rows={8}
            value={values.contenido}
            onChange={(e) => update("contenido", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Fila 4: Imagen y Publicado */}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="imagen">Imagen de portada</label>

          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />

          {previewImage && (
            <div className={styles.imagePreview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewImage} alt="Vista previa" />

              <button
                type="button"
                className={styles.removeImage}
                onClick={() => {
                  setPreviewImage(null);
                  update("imagen", null);
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className={styles.fieldCheckbox}>
          <label className={styles.checkboxLabel}>Publicado</label>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={values.publicado}
                onChange={(e) => update("publicado", e.target.checked)}
              />
              Publicar inmediatamente
            </label>
          </div>
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
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Guardando..." : submitText}
        </button>
      </div>
    </form>
  );
}
