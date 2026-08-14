"use client";

import { useState } from "react";
import {
  FaHeart,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaPaw,
} from "react-icons/fa";

import { submitAdoptionRequest } from "../../../lib/actions/animals/submitAdoptionRequest";

import styles from "./AdoptionForm.module.css";

type Animal = {
  id: string;
  nombre: string;
  especie: string | null;
  raza: string | null;
  edad: string | null;
  sexo: string | null;
  tamano: string | null;
  estado: string | null;
  destacado: boolean | null;
};

type AdoptionFormProps = {
  animals: Animal[];
  initialAnimalId?: string;
};

type FormDataState = {
  animal_id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  ciudad: string;
  tipo_vivienda: string;
  tiene_patio: string;
  alquila: string;
  tiene_hijos: string;
  otras_mascotas: string;
  detalle_mascotas: string;
  experiencia: string;
  motivo_adopcion: string;
};

const EMPTY_FORM: FormDataState = {
  animal_id: "",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  ciudad: "",
  tipo_vivienda: "",
  tiene_patio: "",
  alquila: "",
  tiene_hijos: "",
  otras_mascotas: "",
  detalle_mascotas: "",
  experiencia: "",
  motivo_adopcion: "",
};

export default function AdoptionForm({
  animals,
  initialAnimalId = "",
}: AdoptionFormProps) {
  const selectedAnimalExists = animals.some(
    (animal) => animal.id === initialAnimalId,
  );

  const [formData, setFormData] = useState<FormDataState>({
    ...EMPTY_FORM,
    animal_id: selectedAnimalExists ? initialAnimalId : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const data = new FormData(event.currentTarget);

      const result = await submitAdoptionRequest(data);

      if (!result.success) {
        setErrorMessage(result.error || "No pudimos enviar la solicitud.");
        return;
      }

      setSubmitted(true);

      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error("ADOPTION FORM ERROR:", error);

      setErrorMessage("No pudimos enviar la solicitud. Intentá nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className={styles.success}>
        <div className={styles.successIcon}>
          <FaHeart />
        </div>

        <span className={styles.successEyebrow}>Solicitud enviada</span>

        <h1>Gracias por querer adoptar</h1>

        <p>
          Recibimos tu solicitud correctamente. El equipo de EPA se pondrá en
          contacto con vos para continuar con el proceso de adopción.
        </p>

        <button
          type="button"
          className={styles.successButton}
          onClick={() => {
            setSubmitted(false);
            setErrorMessage("");
          }}
        >
          Enviar otra solicitud
        </button>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}

        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <FaHeart />
          </div>

          <span className={styles.eyebrow}>Adopción responsable</span>

          <h1 className={styles.title}>Quiero adoptar</h1>

          <p className={styles.description}>
            Completá este formulario para comenzar el proceso de adopción.
            Queremos conocerte y asegurarnos de que cada animal encuentre el
            hogar adecuado.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* ANIMAL */}

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <FaPaw />

              <div>
                <h2>¿A quién querés adoptar?</h2>

                <p>Elegí uno de nuestros animales disponibles.</p>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="animal_id">Animal *</label>

              <select
                id="animal_id"
                name="animal_id"
                value={formData.animal_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccioná un animal</option>

                {animals.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.nombre}
                    {animal.raza ? ` · ${animal.raza}` : ""}
                  </option>
                ))}
              </select>

              {animals.length === 0 && (
                <small className={styles.helpText}>
                  Actualmente no hay animales disponibles para adoptar.
                </small>
              )}
            </div>
          </div>

          {/* DATOS PERSONALES */}

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <FaUser />

              <div>
                <h2>Tus datos</h2>

                <p>Necesitamos algunos datos para poder contactarte.</p>
              </div>
            </div>

            <div className={styles.grid}>
              <div className={styles.field}>
                <label htmlFor="nombre">Nombre *</label>

                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="apellido">Apellido *</label>

                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email">
                  <FaEnvelope />
                  Email *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="telefono">
                  <FaPhone />
                  Teléfono *
                </label>

                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="11 1234 5678"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="ciudad">Ciudad *</label>

                <input
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  value={formData.ciudad}
                  onChange={handleChange}
                  placeholder="¿Dónde vivís?"
                  autoComplete="address-level2"
                  required
                />
              </div>
            </div>
          </div>

          {/* HOGAR */}

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <FaHome />

              <div>
                <h2>Tu hogar</h2>

                <p>Contanos un poco sobre el lugar donde viviría el animal.</p>
              </div>
            </div>

            <div className={styles.grid}>
              <div className={styles.field}>
                <label htmlFor="tipo_vivienda">Tipo de vivienda *</label>

                <select
                  id="tipo_vivienda"
                  name="tipo_vivienda"
                  value={formData.tipo_vivienda}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccioná una opción</option>

                  <option value="Casa">Casa</option>

                  <option value="Departamento">Departamento</option>

                  <option value="PH">PH</option>

                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="tiene_patio">¿Tenés patio? *</label>

                <select
                  id="tiene_patio"
                  name="tiene_patio"
                  value={formData.tiene_patio}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccioná una opción</option>

                  <option value="Si">Sí</option>

                  <option value="No">No</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="alquila">¿Alquilás?</label>

                <select
                  id="alquila"
                  name="alquila"
                  value={formData.alquila}
                  onChange={handleChange}
                >
                  <option value="">Seleccioná una opción</option>

                  <option value="Si">Sí</option>

                  <option value="No">No</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="tiene_hijos">¿Tenés hijos?</label>

                <select
                  id="tiene_hijos"
                  name="tiene_hijos"
                  value={formData.tiene_hijos}
                  onChange={handleChange}
                >
                  <option value="">Seleccioná una opción</option>

                  <option value="Si">Sí</option>

                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* OTROS ANIMALES */}

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <FaPaw />

              <div>
                <h2>Otros animales</h2>

                <p>
                  Queremos saber si el nuevo integrante conviviría con otros
                  animales.
                </p>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="otras_mascotas">
                ¿Tenés otros animales actualmente?
              </label>

              <select
                id="otras_mascotas"
                name="otras_mascotas"
                value={formData.otras_mascotas}
                onChange={handleChange}
              >
                <option value="">Seleccioná una opción</option>

                <option value="Si">Sí</option>

                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="detalle_mascotas">Contanos sobre ellos</label>

              <textarea
                id="detalle_mascotas"
                name="detalle_mascotas"
                value={formData.detalle_mascotas}
                onChange={handleChange}
                placeholder="Qué animales tenés, edades, cómo son, etc."
                rows={4}
              />
            </div>
          </div>

          {/* EXPERIENCIA */}

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <FaPaw />

              <div>
                <h2>Sobre tu experiencia</h2>

                <p>Queremos conocerte un poco más.</p>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="experiencia">
                ¿Tuviste animales anteriormente? *
              </label>

              <textarea
                id="experiencia"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleChange}
                placeholder="Contanos brevemente sobre tu experiencia con animales..."
                rows={5}
                required
              />
            </div>
          </div>

          {/* MOTIVO */}

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <FaHeart />

              <div>
                <h2>Un último mensaje</h2>

                <p>Contanos por qué querés adoptar.</p>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="motivo_adopcion">
                ¿Por qué querés adoptar? *
              </label>

              <textarea
                id="motivo_adopcion"
                name="motivo_adopcion"
                value={formData.motivo_adopcion}
                onChange={handleChange}
                placeholder="Escribí acá todo lo que quieras contarnos..."
                rows={6}
                required
              />
            </div>
          </div>

          {/* ERROR */}

          {errorMessage && (
            <div role="alert" className={styles.errorMessage}>
              {errorMessage}
            </div>
          )}

          {/* SUBMIT */}

          <div className={styles.submitWrapper}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || animals.length === 0}
            >
              <FaHeart />

              {isSubmitting ? "Enviando..." : "Enviar solicitud de adopción"}
            </button>

            <p className={styles.privacy}>
              Al enviar este formulario aceptás que EPA utilice estos datos
              únicamente para contactarte en relación con la solicitud de
              adopción.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
