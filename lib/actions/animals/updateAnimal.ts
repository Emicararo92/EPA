"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function updateAnimal(id: string, formData: FormData) {
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

  const slug = nombre
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  /*
   * Actualizar datos
   */
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
    throw new Error(updateError.message);
  }

  /*
   * Nuevas imágenes
   */
  const images = formData
    .getAll("images")
    .filter((file): file is File => file instanceof File && file.size > 0);

  if (images.length > 5) {
    throw new Error("Podés subir un máximo de 5 imágenes por vez.");
  }

  /*
   * Obtener imágenes actuales
   */
  const { data: currentMedia, error: currentMediaError } = await supabase
    .from("animal_media")
    .select("id, storage_path, es_portada, orden")
    .eq("animal_id", id)
    .order("orden", {
      ascending: true,
    });

  if (currentMediaError) {
    throw new Error(currentMediaError.message);
  }

  /*
   * Si no agregaron imágenes nuevas,
   * terminamos acá.
   */
  if (images.length === 0) {
    revalidatePath("/admin/animals");
    revalidatePath(`/admin/animals/${id}`);
    revalidatePath("/animals");
    revalidatePath(`/animals/${id}`);

    redirect("/admin/animals");
  }

  /*
   * Máximo total de 5 imágenes
   */
  const currentCount = currentMedia?.length ?? 0;

  if (currentCount + images.length > 5) {
    throw new Error(
      `El animal ya tiene ${currentCount} imágenes. El máximo permitido es 5.`,
    );
  }

  const uploadedPaths: string[] = [];

  /*
   * Si por algún motivo no existe portada,
   * la primera imagen nueva será portada.
   */
  const hasCover = currentMedia?.some((media) => media.es_portada);

  const startingOrder = currentCount + 1;

  for (let index = 0; index < images.length; index++) {
    const image = images[index];

    const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";

    const order = startingOrder + index;

    const storagePath = `${id}/foto-${order}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("animals")
      .upload(storagePath, image);

    if (uploadError) {
      if (uploadedPaths.length > 0) {
        await supabase.storage.from("animals").remove(uploadedPaths);
      }

      throw new Error(uploadError.message);
    }

    uploadedPaths.push(storagePath);

    const makeCover = !hasCover && index === 0;

    const { error: mediaError } = await supabase.from("animal_media").insert({
      animal_id: id,
      tipo: "image",
      storage_path: storagePath,
      es_portada: makeCover,
      orden: order,
    });

    if (mediaError) {
      await supabase.storage.from("animals").remove(uploadedPaths);

      throw new Error(mediaError.message);
    }
  }

  revalidatePath("/admin/animals");
  revalidatePath(`/admin/animals/${id}`);
  revalidatePath("/animals");
  revalidatePath(`/animals/${id}`);

  redirect("/admin/animals");
}
