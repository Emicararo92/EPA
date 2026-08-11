"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function deleteAnimal(id: string) {
  const supabase = await createClient();

  console.log("========================================");
  console.log("DELETE ANIMAL");
  console.log("========================================");
  console.log("ID:", id);

  /*
   * Primero buscamos todas las imágenes
   * asociadas al animal.
   */
  const { data: media, error: mediaError } = await supabase
    .from("animal_media")
    .select("id, storage_path")
    .eq("animal_id", id);

  if (mediaError) {
    console.error("GET ANIMAL MEDIA ERROR:", mediaError);

    throw new Error(mediaError.message);
  }

  console.log("MEDIA:", media);

  /*
   * Eliminamos los archivos de Storage.
   */
  const storagePaths =
    media?.map((item) => item.storage_path).filter(Boolean) ?? [];

  if (storagePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("animals")
      .remove(storagePaths);

    if (storageError) {
      console.error("DELETE STORAGE ERROR:", storageError);

      throw new Error(storageError.message);
    }
  }

  /*
   * Eliminamos los registros de animal_media.
   */
  const { error: deleteMediaError } = await supabase
    .from("animal_media")
    .delete()
    .eq("animal_id", id);

  if (deleteMediaError) {
    console.error("DELETE ANIMAL MEDIA ERROR:", deleteMediaError);

    throw new Error(deleteMediaError.message);
  }

  /*
   * Finalmente eliminamos el animal.
   */
  const { error: deleteAnimalError } = await supabase
    .from("animals")
    .delete()
    .eq("id", id);

  if (deleteAnimalError) {
    console.error("DELETE ANIMAL ERROR:", deleteAnimalError);

    throw new Error(deleteAnimalError.message);
  }

  console.log("========================================");
  console.log("ANIMAL DELETED SUCCESSFULLY");
  console.log("========================================");

  revalidatePath("/admin/animals");

  redirect("/admin/animals");
}
