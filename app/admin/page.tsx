import Link from "next/link";
import { getAnimals } from "@/lib/actions/animals/getAnimals";
import { getPosts } from "@/lib/actions/posts/getPosts";
import { FaPaw, FaDog, FaCat, FaNewspaper } from "react-icons/fa";
import styles from "./AdminPage.module.css";

export default async function AdminPage() {
  const [animals, posts] = await Promise.all([getAnimals(), getPosts()]);

  const totalAnimals = animals.length;
  const totalDogs = animals.filter(
    (animal) => animal.especie === "Perro",
  ).length;
  const totalCats = animals.filter(
    (animal) => animal.especie === "Gato",
  ).length;
  const totalPosts = posts.length;

  const latestAnimals = animals.slice(0, 5);
  const latestPosts = posts.slice(0, 5);

  return (
    <div className={styles.dashboard}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Inicio</h1>
          <p className={styles.subtitle}>Panel de administración de EPA</p>
        </div>
      </div>

      {/* ESTADÍSTICAS */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <FaPaw className={styles.statIcon} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{totalAnimals}</span>
            <span className={styles.statLabel}>Animales</span>
            <span className={styles.statSubtext}>Total registrados</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <FaDog className={styles.statIcon} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{totalDogs}</span>
            <span className={styles.statLabel}>Perros</span>
            <span className={styles.statSubtext}>Total registrados</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <FaCat className={styles.statIcon} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{totalCats}</span>
            <span className={styles.statLabel}>Gatos</span>
            <span className={styles.statSubtext}>Total registrados</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <FaNewspaper className={styles.statIcon} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{totalPosts}</span>
            <span className={styles.statLabel}>Posts</span>
            <span className={styles.statSubtext}>Total publicados</span>
          </div>
        </div>
      </section>

      {/* ACCIONES RÁPIDAS */}
      <section className={styles.actions}>
        <Link href="/admin/animals/new" className={styles.btnPrimary}>
          + Nuevo animal
        </Link>
        <Link href="/admin/posts/new" className={styles.btnSecondary}>
          + Nuevo post
        </Link>
      </section>

      {/* ÚLTIMOS REGISTROS */}
      <section className={styles.sectionsGrid}>
        {/* ÚLTIMOS ANIMALES */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Últimos animales</h2>
            <Link href="/admin/animals" className={styles.sectionLink}>
              Ver todos
            </Link>
          </div>

          {latestAnimals.length === 0 ? (
            <p className={styles.emptyState}>No hay animales registrados.</p>
          ) : (
            <div className={styles.listContainer}>
              {latestAnimals.map((animal) => (
                <Link
                  key={animal.id}
                  href={`/admin/animals/${animal.id}`}
                  className={styles.listItem}
                >
                  <div className={styles.listItemContent}>
                    <div className={styles.listItemMain}>
                      <strong className={styles.listItemTitle}>
                        {animal.nombre}
                      </strong>
                      <span className={styles.listItemSubtext}>
                        {animal.especie}
                      </span>
                    </div>
                    <span
                      className={`${styles.badge} ${styles[`badge${animal.estado}`]}`}
                    >
                      {animal.estado}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ÚLTIMOS POSTS */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Últimos posts</h2>
            <Link href="/admin/posts" className={styles.sectionLink}>
              Ver todos
            </Link>
          </div>

          {latestPosts.length === 0 ? (
            <p className={styles.emptyState}>No hay publicaciones.</p>
          ) : (
            <div className={styles.listContainer}>
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/posts/${post.id}`}
                  className={styles.listItem}
                >
                  <div className={styles.listItemContent}>
                    <div className={styles.listItemMain}>
                      <strong className={styles.listItemTitle}>
                        {post.titulo}
                      </strong>
                      <span className={styles.listItemSubtext}>
                        {post.tipo}
                      </span>
                    </div>
                    <span
                      className={`${styles.badge} ${post.publicado ? styles.badgePublicado : styles.badgeBorrador}`}
                    >
                      {post.publicado ? "Publicado" : "Borrador"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
