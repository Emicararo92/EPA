"use client";

type Props = {
  submitText: string;
  action: (formData: FormData) => void | Promise<void>;
  imageRequired?: boolean;
  initialValues?: {
    nombre: string;
    especie: "Perro" | "Gato";
    raza: string;
    edad: "Cachorro" | "Joven" | "Adulto" | "Adulto mayor";
    sexo: "Macho" | "Hembra";
    tamano: "Pequeño" | "Mediano" | "Grande" | null;
    peso: number | null;
    historia: string;
    fecha_rescate: string;
    estado:
      | "Disponible"
      | "Reservado"
      | "En recuperación"
      | "En tránsito"
      | "Adoptado";
    vacunado: boolean;
    castrado: boolean;
    desparasitado: boolean;
    compatible_ninos: boolean;
    compatible_perros: boolean;
    compatible_gatos: boolean;
    observaciones: string;
    destacado: boolean;
    publicado: boolean;
  };
};

export default function AnimalForm({
  submitText,
  action,
  imageRequired = false,
  initialValues,
}: Props) {
  return (
    <form
      action={action}
      encType="multipart/form-data"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginTop: 30,
      }}
    >
      <input
        name="nombre"
        placeholder="Nombre"
        defaultValue={initialValues?.nombre}
        required
      />

      <select
        name="especie"
        defaultValue={initialValues?.especie ?? "Perro"}
        required
      >
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
      </select>

      <input
        name="raza"
        placeholder="Raza"
        defaultValue={initialValues?.raza}
      />

      <select
        name="edad"
        defaultValue={initialValues?.edad ?? "Adulto"}
        required
      >
        <option value="Cachorro">Cachorro</option>
        <option value="Joven">Joven</option>
        <option value="Adulto">Adulto</option>
        <option value="Adulto mayor">Adulto mayor</option>
      </select>

      <select
        name="sexo"
        defaultValue={initialValues?.sexo ?? "Macho"}
        required
      >
        <option value="Macho">Macho</option>
        <option value="Hembra">Hembra</option>
      </select>

      <select name="tamano" defaultValue={initialValues?.tamano ?? ""}>
        <option value="">Seleccionar tamaño</option>
        <option value="Pequeño">Pequeño</option>
        <option value="Mediano">Mediano</option>
        <option value="Grande">Grande</option>
      </select>

      <input
        type="number"
        step="0.1"
        min="0"
        name="peso"
        placeholder="Peso (kg)"
        defaultValue={initialValues?.peso ?? ""}
      />

      <input
        type="date"
        name="fecha_rescate"
        defaultValue={initialValues?.fecha_rescate}
      />

      <select
        name="estado"
        defaultValue={initialValues?.estado ?? "Disponible"}
        required
      >
        <option value="Disponible">Disponible</option>
        <option value="Reservado">Reservado</option>
        <option value="En recuperación">En recuperación</option>
        <option value="En tránsito">En tránsito</option>
        <option value="Adoptado">Adoptado</option>
      </select>

      <textarea
        name="historia"
        placeholder="Historia"
        rows={6}
        defaultValue={initialValues?.historia}
      />

      <textarea
        name="observaciones"
        placeholder="Observaciones"
        rows={4}
        defaultValue={initialValues?.observaciones}
      />

      {/* IMÁGENES */}
      <div>
        <label
          htmlFor="images"
          style={{
            display: "block",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Fotos del animal
        </label>

        <input
          id="images"
          type="file"
          name="images"
          accept="image/*"
          multiple
          required={imageRequired}
        />

        <small
          style={{
            display: "block",
            marginTop: 6,
            opacity: 0.7,
          }}
        >
          Podés seleccionar hasta 5 imágenes. La primera será utilizada como
          portada.
        </small>
      </div>

      <label>
        <input
          type="checkbox"
          name="vacunado"
          defaultChecked={initialValues?.vacunado}
        />
        Vacunado
      </label>

      <label>
        <input
          type="checkbox"
          name="castrado"
          defaultChecked={initialValues?.castrado}
        />
        Castrado
      </label>

      <label>
        <input
          type="checkbox"
          name="desparasitado"
          defaultChecked={initialValues?.desparasitado}
        />
        Desparasitado
      </label>

      <label>
        <input
          type="checkbox"
          name="compatible_ninos"
          defaultChecked={initialValues?.compatible_ninos}
        />
        Compatible con niños
      </label>

      <label>
        <input
          type="checkbox"
          name="compatible_perros"
          defaultChecked={initialValues?.compatible_perros}
        />
        Compatible con perros
      </label>

      <label>
        <input
          type="checkbox"
          name="compatible_gatos"
          defaultChecked={initialValues?.compatible_gatos}
        />
        Compatible con gatos
      </label>

      <label>
        <input
          type="checkbox"
          name="destacado"
          defaultChecked={initialValues?.destacado}
        />
        Destacado
      </label>

      <label>
        <input
          type="checkbox"
          name="publicado"
          defaultChecked={initialValues?.publicado ?? true}
        />
        Publicado
      </label>

      <button type="submit">{submitText}</button>
    </form>
  );
}
