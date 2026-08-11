"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAnimal(id: string) {
  const supabase = await createClient();

  console.log("=================================");
  console.log("GET ANIMAL ID:", id);

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
    .eq("id", id)
    .single();

  console.log("GET ANIMAL DATA:", data);
  console.log("GET ANIMAL ERROR:", error);
  console.log("=================================");

  if (error) {
    console.error("GET ANIMAL ERROR:", error);
    throw new Error(error.message);
  }

  return data;
}
