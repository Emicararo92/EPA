import Link from "next/link";
import { FaArrowLeft, FaPaw } from "react-icons/fa";

import { getAnimal } from "@/lib/actions/animals/getAnimal";
import { updateAnimal } from "@/lib/actions/animals/updateAnimal";

import styles from "../new/NewAnimalPage.module.css";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAnimalPage({ params }: Props) {
  const { id } = await params;

  const animal = await getAnimal(id);

  const updateAction = async (formData: FormData) => {
    "use server";

    await updateAnimal(id, formData);
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
                <h1 className={styles.title}>Editar Animal</h1>

                <p className={styles.subtitle}>
                  Actualiza los datos de {animal.nombre}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form action={updateAction} className={styles.formWrapper}>
          {/* Fila 1: Nombre y Especie */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="nombre">Nombre *</label>

              <input
                type="text"
                id="nombre"
                name="nombre"
                defaultValue={animal.nombre}
                placeholder="Ej: Luna"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="especie">Especie *</label>

              <select
                id="especie"
                name="especie"
                defaultValue={animal.especie}
                required
              >
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
                defaultValue={animal.raza ?? ""}
                placeholder="Ej: Labrador"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="edad">Edad</label>

              <select
                id="edad"
                name="edad"
                defaultValue={animal.edad ?? "Adulto"}
              >
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

              <select id="sexo" name="sexo" defaultValue={animal.sexo} required>
                <option value="Macho">♂ Macho</option>
                <option value="Hembra">♀ Hembra</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="tamano">Tamaño</label>

              <select
                id="tamano"
                name="tamano"
                defaultValue={animal.tamano ?? "Mediano"}
              >
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
                defaultValue={animal.peso ?? ""}
                placeholder="Ej: 12.5"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="fecha_rescate">Fecha de Rescate</label>

              <input
                type="date"
                id="fecha_rescate"
                name="fecha_rescate"
                defaultValue={animal.fecha_rescate ?? ""}
              />
            </div>
          </div>

          {/* Fila 5: Estado, Publicado y Destacado */}
          <div className={styles.rowThree}>
            <div className={styles.field}>
              <label htmlFor="estado">Estado *</label>

              <select
                id="estado"
                name="estado"
                defaultValue={animal.estado}
                required
              >
                <option value="Disponible">Disponible</option>
                <option value="Reservado">Reservado</option>
                <option value="Adoptado">Adoptado</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="publicado">Publicado</label>

              <select
                id="publicado"
                name="publicado"
                defaultValue={animal.publicado ? "true" : "false"}
              >
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="destacado">Destacado</label>

              <select
                id="destacado"
                name="destacado"
                defaultValue={animal.destacado ? "true" : "false"}
              >
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          {/* Fila 6: Imagen */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="imagen">Imagen</label>

              <input type="file" id="imagen" name="image" accept="image/*" />
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
                defaultValue={animal.historia ?? ""}
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
                defaultValue={animal.observaciones ?? ""}
                placeholder="Observaciones adicionales..."
              />
            </div>
          </div>

          {/* Fila 9: Características */}
          <div className={styles.rowFull}>
            <label className={styles.checkboxLabel}>Características</label>

            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  name="vacunado"
                  defaultChecked={animal.vacunado}
                />
                Vacunado
              </label>

              <label>
                <input
                  type="checkbox"
                  name="castrado"
                  defaultChecked={animal.castrado}
                />
                Castrado
              </label>

              <label>
                <input
                  type="checkbox"
                  name="desparasitado"
                  defaultChecked={animal.desparasitado}
                />
                Desparasitado
              </label>

              <label>
                <input
                  type="checkbox"
                  name="compatible_ninos"
                  defaultChecked={animal.compatible_ninos}
                />
                Compatible con niños
              </label>

              <label>
                <input
                  type="checkbox"
                  name="compatible_perros"
                  defaultChecked={animal.compatible_perros}
                />
                Compatible con perros
              </label>

              <label>
                <input
                  type="checkbox"
                  name="compatible_gatos"
                  defaultChecked={animal.compatible_gatos}
                />
                Compatible con gatos
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className={styles.actions}>
            <Link href="/admin/animals" className={styles.cancelButton}>
              Cancelar
            </Link>

            <button type="submit" className={styles.submitButton}>
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
