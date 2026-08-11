import AnimalForm from "@/components/admin/animals/AnimalForm";
import { createAnimal } from "@/lib/actions/animals/createAnimal";

export default function NewAnimalPage() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
      }}
    >
      <h1>Nuevo Animal</h1>

      <AnimalForm
        submitText="Crear Animal"
        action={createAnimal}
        initialValues={{
          nombre: "",
          especie: "Perro",
          raza: "",
          edad: "Cachorro",
          sexo: "Macho",
          tamano: null,
          peso: null,
          historia: "",
          fecha_rescate: "",
          estado: "Disponible",
          vacunado: false,
          castrado: false,
          desparasitado: false,
          compatible_ninos: false,
          compatible_perros: false,
          compatible_gatos: false,
          observaciones: "",
          destacado: false,
          publicado: true,
        }}
      />
    </main>
  );
}
