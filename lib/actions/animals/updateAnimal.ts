"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function updateAnimal(id: string, formData: FormData) {
  const supabase = await createClient();

  const nombre = (formData.get("nombre") as string).trim();

  const especie = formData.get("especie") as "Perro" | "Gato";

  const raza = (formData.get("raza") as string) || "";

  const edad = formData.get("edad") as
    | "Cachorro"
    | "Joven"
    | "Adulto"
    | "Adulto mayor";

  const sexo = formData.get("sexo") as "Macho" | "Hembra";

  const tamano = (formData.get("tamano") || null) as
    | "Pequeño"
    | "Mediano"
    | "Grande"
    | null;

  const pesoValue = formData.get("peso");

  const peso =
    pesoValue && String(pesoValue).trim() !== "" ? Number(pesoValue) : null;

  const historia = (formData.get("historia") as string) || "";

  const fecha_rescate = (formData.get("fecha_rescate") as string) || null;

  const estado = formData.get("estado") as
    | "Disponible"
    | "Reservado"
    | "En recuperación"
    | "En tránsito"
    | "Adoptado";

  const observaciones = (formData.get("observaciones") as string) || "";

  const vacunado = formData.has("vacunado");
  const castrado = formData.has("castrado");
  const desparasitado = formData.has("desparasitado");

  const compatible_ninos = formData.has("compatible_ninos");

  const compatible_perros = formData.has("compatible_perros");

  const compatible_gatos = formData.has("compatible_gatos");

  const destacado = formData.has("destacado");
  const publicado = formData.has("publicado");

  const image = formData.get("image");

  if (!nombre) {
    throw new Error("El nombre es obligatorio.");
  }

  if (peso !== null && (!Number.isFinite(peso) || peso <= 0)) {
    throw new Error("El peso debe ser mayor a 0.");
  }

  const slug = nombre
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  console.log("========================================");
  console.log("UPDATE ANIMAL");
  console.log("========================================");
  console.log("ID:", id);
  console.log("PAYLOAD:", {
    nombre,
    slug,
    especie,
    raza,
    edad,
    sexo,
    tamano,
    peso,
    historia,
    fecha_rescate,
    estado,
    vacunado,
    castrado,
    desparasitado,
    compatible_ninos,
    compatible_perros,
    compatible_gatos,
    observaciones,
    destacado,
    publicado,
  });

  const { error: updateError } = await supabase
    .from("animals")
    .update({
      nombre,
      slug,
      especie,
      raza,
      edad,
      sexo,
      tamano,
      peso,
      historia,
      fecha_rescate,
      estado,
      vacunado,
      castrado,
      desparasitado,
      compatible_ninos,
      compatible_perros,
      compatible_gatos,
      observaciones,
      destacado,
      publicado,
    })
    .eq("id", id);

  if (updateError) {
    console.error("UPDATE ANIMAL ERROR:", updateError);

    throw new Error(updateError.message);
  }

  /*
   * Si no enviaron una nueva imagen,
   * terminamos acá.
   */
  if (!(image instanceof File) || image.size === 0) {
    console.log("No se cambió la imagen.");

    revalidatePath("/admin/animals");
    revalidatePath(`/admin/animals/${id}`);

    redirect("/admin/animals");
  }

  console.log("Nueva imagen detectada:", {
    name: image.name,
    size: image.size,
    type: image.type,
  });

  /*
   * Buscamos la portada actual.
   */
  const { data: currentMedia, error: mediaFetchError } = await supabase
    .from("animal_media")
    .select("id, storage_path")
    .eq("animal_id", id)
    .eq("es_portada", true)
    .maybeSingle();

  if (mediaFetchError) {
    console.error("GET CURRENT MEDIA ERROR:", mediaFetchError);

    throw new Error(mediaFetchError.message);
  }

  /*
   * Eliminamos la imagen anterior de Storage.
   */
  if (currentMedia?.storage_path) {
    const { error: removeError } = await supabase.storage
      .from("animals")
      .remove([currentMedia.storage_path]);

    if (removeError) {
      console.error("REMOVE OLD IMAGE ERROR:", removeError);

      throw new Error(removeError.message);
    }

    /*
     * Eliminamos el registro anterior.
     */
    const { error: deleteMediaError } = await supabase
      .from("animal_media")
      .delete()
      .eq("id", currentMedia.id);

    if (deleteMediaError) {
      console.error("DELETE OLD MEDIA ERROR:", deleteMediaError);

      throw new Error(deleteMediaError.message);
    }
  }

  /*
   * Subimos la nueva portada.
   */
  const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";

  const storagePath = `${id}/portada.${extension}`;

  console.log("NEW STORAGE PATH:", storagePath);

  const { error: uploadError } = await supabase.storage
    .from("animals")
    .upload(storagePath, image, {
      upsert: true,
    });

  if (uploadError) {
    console.error("UPLOAD NEW IMAGE ERROR:", uploadError);

    throw new Error(uploadError.message);
  }

  /*
   * Creamos el nuevo registro en animal_media.
   */
  const { error: mediaError } = await supabase.from("animal_media").insert({
    animal_id: id,
    tipo: "image",
    storage_path: storagePath,
    es_portada: true,
    orden: 1,
  });

  if (mediaError) {
    console.error("CREATE NEW MEDIA ERROR:", mediaError);

    await supabase.storage.from("animals").remove([storagePath]);

    throw new Error(mediaError.message);
  }

  console.log("========================================");
  console.log("ANIMAL UPDATED SUCCESSFULLY");
  console.log("========================================");

  revalidatePath("/admin/animals");
  revalidatePath(`/admin/animals/${id}`);

  redirect("/admin/animals");
}
