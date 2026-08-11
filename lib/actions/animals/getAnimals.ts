"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAnimals() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("animals")
    .select(
      `
      *,
      animal_media (
        id,
        storage_path,
        es_portada,
        orden
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET ANIMALS ERROR:", error);
    throw new Error(error.message);
  }

  return data;
}
