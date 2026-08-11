"use server";

import { createClient } from "@/lib/supabase/server";

export async function getPublishedAnimals() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("animals")
    .select(
      `
      id,
      nombre,
      especie,
      raza,
      edad,
      sexo,
      tamano,
      estado,
      destacado,
      animal_media (
        id,
        storage_path,
        es_portada,
        orden
      )
    `,
    )
    .eq("publicado", true)
    .eq("estado", "Disponible")
    .order("nombre", { ascending: true });

  if (error) {
    console.error("GET PUBLISHED ANIMALS ERROR:", error);
    throw new Error(error.message);
  }

  return data;
}
