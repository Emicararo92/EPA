"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function createAnimal(formData: FormData) {
  const supabase = await createClient();

  const nombre = ((formData.get("nombre") as string) || "").trim();

  if (!nombre) {
    throw new Error("El nombre es obligatorio.");
  }

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

  if (peso !== null && (!Number.isFinite(peso) || peso <= 0)) {
    throw new Error("El peso debe ser mayor a 0.");
  }

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

  /*
   * Imágenes
   */
  const images = formData
    .getAll("images")
    .filter((file): file is File => file instanceof File && file.size > 0);

  if (images.length === 0) {
    throw new Error("Debés subir al menos una imagen.");
  }

  if (images.length > 5) {
    throw new Error("Podés subir un máximo de 5 imágenes.");
  }

  const slug = nombre
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  /*
   * Crear animal
   */
  const { data: animal, error } = await supabase
    .from("animals")
    .insert({
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
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const uploadedPaths: string[] = [];

  /*
   * Subir imágenes
   */
  for (let index = 0; index < images.length; index++) {
    const image = images[index];

    const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";

    const storagePath = `${animal.id}/foto-${index + 1}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("animals")
      .upload(storagePath, image);

    if (uploadError) {
      await supabase.storage.from("animals").remove(uploadedPaths);

      await supabase.from("animals").delete().eq("id", animal.id);

      throw new Error(uploadError.message);
    }

    uploadedPaths.push(storagePath);

    /*
     * Primera imagen = portada
     */
    const { error: mediaError } = await supabase.from("animal_media").insert({
      animal_id: animal.id,
      tipo: "image",
      storage_path: storagePath,
      es_portada: index === 0,
      orden: index + 1,
    });

    if (mediaError) {
      await supabase.storage.from("animals").remove(uploadedPaths);

      await supabase.from("animals").delete().eq("id", animal.id);

      throw new Error(mediaError.message);
    }
  }

  revalidatePath("/admin/animals");
  revalidatePath("/animals");

  redirect("/admin/animals");
}
