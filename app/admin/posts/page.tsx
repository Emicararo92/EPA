import Link from "next/link";
import {
  FaPlus,
  FaEdit,
  FaNewspaper,
  FaFileAlt,
  FaImage,
} from "react-icons/fa";
import DeletePostButton from "@/components/admin/posts/DeletePostButton";
import { getPosts } from "@/lib/actions/posts/getPosts";
import styles from "./AdminPostsPage.module.css";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  const getTipoIcon = (tipo: string) => {
    if (tipo === "Noticia") return <FaNewspaper className={styles.tipoIcon} />;
    if (tipo === "Blog") return <FaFileAlt className={styles.tipoIcon} />;
    return <FaImage className={styles.tipoIcon} />;
  };

  return (
    <main className={styles.main}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Posts</h1>
          <p className={styles.subtitle}>Gestión de publicaciones de EPA</p>
        </div>
        <Link href="/admin/posts/new" className={styles.btnPrimary}>
          <FaPlus className={styles.btnIcon} />
          Nuevo Post
        </Link>
      </div>

      {/* TABLA */}
      {posts.length === 0 ? (
        <div className={styles.emptyState}>
          <FaNewspaper className={styles.emptyIcon} />
          <p>No hay publicaciones.</p>
          <Link href="/admin/posts/new" className={styles.btnPrimary}>
            <FaPlus className={styles.btnIcon} />
            Crear primer post
          </Link>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Publicado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <span className={styles.postTitle}>{post.titulo}</span>
                  </td>
                  <td>
                    <span className={styles.tipoBadge}>
                      {getTipoIcon(post.tipo)}
                      {post.tipo}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${styles.badge} ${post.publicado ? styles.badgePublicado : styles.badgeBorrador}`}
                    >
                      {post.publicado ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td>
                    <span className={styles.dateText}>
                      {new Date(post.created_at).toLocaleDateString("es-AR")}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className={styles.actionEdit}
                      >
                        <FaEdit />
                      </Link>
                      <DeletePostButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
