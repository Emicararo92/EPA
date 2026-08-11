import { createClient } from "@/lib/supabase/server";

export async function getPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      titulo,
      slug,
      tipo,
      resumen,
      contenido,
      imagen_portada,
      publicado,
      created_at,
      updated_at
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
