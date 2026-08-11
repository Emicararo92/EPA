"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import type { PostFormData } from "@/components/admin/posts/PostForm";

export async function updatePost(id: string, values: PostFormData) {
  const supabase = await createClient();

  const slug = values.titulo
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const updateData: {
    titulo: string;
    slug: string;
    tipo: PostFormData["tipo"];
    resumen: string;
    contenido: string;
    publicado: boolean;
    updated_at: string;
    imagen_portada?: string;
  } = {
    titulo: values.titulo,
    slug,
    tipo: values.tipo,
    resumen: values.resumen,
    contenido: values.contenido,
    publicado: values.publicado,
    updated_at: new Date().toISOString(),
  };

  // Subir nueva imagen solamente si el usuario seleccionó una
  if (values.imagen && values.imagen.size > 0) {
    const extension =
      values.imagen.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${crypto.randomUUID()}.${extension}`;
    const filePath = `posts/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("posts")
      .upload(filePath, values.imagen, {
        contentType: values.imagen.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("UPLOAD ERROR:", uploadError);

      throw new Error(`Error al subir la imagen: ${uploadError.message}`);
    }

    const { data: publicUrl } = supabase.storage
      .from("posts")
      .getPublicUrl(filePath);

    updateData.imagen_portada = publicUrl.publicUrl;
  }

  const { error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("UPDATE POST ERROR:", error);

    throw new Error(error.message);
  }

  revalidatePath("/admin/posts");
  revalidatePath("/");
}
