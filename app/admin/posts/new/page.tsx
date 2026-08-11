import Link from "next/link";
import { FaArrowLeft, FaNewspaper } from "react-icons/fa";
import PostForm from "@/components/admin/posts/PostForm";
import { createPost } from "@/lib/actions/posts/createPost";
import styles from "./NewPostPage.module.css";

export default function NewPostPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Link href="/admin/posts" className={styles.backLink}>
            <FaArrowLeft className={styles.backIcon} />
            Volver
          </Link>

          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <FaNewspaper className={styles.headerIcon} />
              </div>

              <div>
                <h1 className={styles.title}>Nuevo Post</h1>

                <p className={styles.subtitle}>
                  Crea una nueva publicación para EPA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className={styles.formWrapper}>
          <PostForm
            initialValues={{
              titulo: "",
              tipo: "Noticia",
              resumen: "",
              contenido: "",
              publicado: true,
              imagen: null,
            }}
            submitText="Crear Post"
            action={createPost}
          />
        </div>
      </div>
    </div>
  );
}
