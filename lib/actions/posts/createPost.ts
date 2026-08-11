"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type CreatePostData = {
  titulo: string;
  tipo: "Noticia" | "Historia" | "Rescate";
  resumen: string;
  contenido: string;
  publicado: boolean;
  imagen: File | null;
};

export async function createPost(values: CreatePostData) {
  const supabase = await createClient();

  const slug = values.titulo
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  let imagen_portada: string | null = null;

  // Subir imagen si existe
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

    imagen_portada = publicUrl.publicUrl;
  }

  // Crear post
  const { error } = await supabase.from("posts").insert({
    titulo: values.titulo,
    slug,
    tipo: values.tipo,
    resumen: values.resumen,
    contenido: values.contenido,
    imagen_portada,
    publicado: values.publicado,
  });

  if (error) {
    console.error("CREATE POST ERROR:", error);

    throw new Error(error.message);
  }

  revalidatePath("/admin/posts");
  revalidatePath("/");
}
