"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deletePost } from "@/lib/actions/posts/deletePost";

type Props = {
  id: string;
};

export default function DeletePostButton({ id }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar este post?",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      try {
        await deletePost(id);
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("No se pudo eliminar el post.");
      }
    });
  }

  return (
    <button type="button" onClick={handleDelete} disabled={isPending}>
      {isPending ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
