"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function createAnimal(formData: FormData) {
  const supabase = await createClient();

  const nombre = formData.get("nombre") as string;
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

  const peso = formData.get("peso") ? Number(formData.get("peso")) : null;

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

  if (!(image instanceof File) || image.size === 0) {
    throw new Error("La imagen es obligatoria.");
  }

  const slug = nombre
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

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

  const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";

  const storagePath = `${animal.id}/portada.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("animals")
    .upload(storagePath, image);

  if (uploadError) {
    await supabase.from("animals").delete().eq("id", animal.id);

    throw new Error(uploadError.message);
  }

  const { error: mediaError } = await supabase.from("animal_media").insert({
    animal_id: animal.id,
    tipo: "image",
    storage_path: storagePath,
    es_portada: true,
    orden: 1,
  });

  if (mediaError) {
    await supabase.storage.from("animals").remove([storagePath]);

    await supabase.from("animals").delete().eq("id", animal.id);

    throw new Error(mediaError.message);
  }

  revalidatePath("/admin/animals");

  redirect("/admin/animals");
}
