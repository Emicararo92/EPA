import { notFound } from "next/navigation";

import PostForm from "@/components/admin/posts/PostForm";

import { getPost } from "@/lib/actions/posts/getPost";
import { updatePost } from "@/lib/actions/posts/updatePost";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;

  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
      }}
    >
      <h1>Editar Post</h1>

      <PostForm
        submitText="Guardar cambios"
        initialValues={{
          titulo: post.titulo,
          tipo: post.tipo,
          resumen: post.resumen ?? "",
          contenido: post.contenido,
          publicado: post.publicado,
          imagen: null,
        }}
        action={async (values) => {
          "use server";

          await updatePost(id, values);
        }}
      />
    </main>
  );
}
