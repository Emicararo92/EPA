import Image from "next/image";
import Link from "next/link";

import { getPosts } from "@/lib/actions/posts/getPosts";

import styles from "./PostsSection.module.css";

export default async function PostsSection() {
  const posts = await getPosts();

  const publishedPosts = posts.filter((post) => post.publicado).slice(0, 3);

  const featuredPost = publishedPosts[0];
  const secondaryPosts = publishedPosts.slice(1, 3);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  if (publishedPosts.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <span className={styles.eyebrow}>ACTUALIDAD</span>

              <h2 className={styles.title}>
                Historias que vale
                <br />
                la pena contar.
              </h2>

              <p className={styles.description}>
                Conocé las últimas noticias, rescates y novedades de EPA y
                nuestra comunidad.
              </p>
            </div>

            <Link href="/noticias" className={styles.viewAll}>
              Ver todas las noticias
              <span>→</span>
            </Link>
          </div>

          <div className={styles.empty}>
            <p>Próximamente compartiremos nuevas noticias.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>ACTUALIDAD</span>

            <h2 className={styles.title}>
              Historias que vale
              <br />
              la pena contar.
            </h2>

            <div className={styles.separator} />

            <p className={styles.description}>
              Conocé las últimas noticias, rescates y novedades de EPA y nuestra
              comunidad.
            </p>
          </div>

          <Link href="/noticias" className={styles.viewAll}>
            <span>Ver todas las noticias</span>
            <span className={styles.viewAllArrow}>→</span>
          </Link>
        </div>

        {/* POSTS */}
        <div className={styles.postsLayout}>
          {/* POST PRINCIPAL */}
          {featuredPost && (
            <Link
              href={`/noticias/${featuredPost.id}`}
              className={styles.featuredCard}
            >
              <div className={styles.featuredImage}>
                {featuredPost.imagen_portada ? (
                  <Image
                    src={featuredPost.imagen_portada}
                    alt={featuredPost.titulo}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.noImage}>
                    <span>EPA</span>
                  </div>
                )}
              </div>

              <div className={styles.featuredContent}>
                <span className={styles.type}>{featuredPost.tipo}</span>

                <h3>{featuredPost.titulo}</h3>

                {featuredPost.resumen && (
                  <p className={styles.summary}>{featuredPost.resumen}</p>
                )}

                <div className={styles.cardBottom}>
                  <span className={styles.date}>
                    {formatDate(featuredPost.created_at)}
                  </span>

                  <span className={styles.readMore}>
                    Leer {featuredPost.tipo.toLowerCase()}
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* POSTS SECUNDARIOS */}
          <div className={styles.secondaryPosts}>
            {secondaryPosts.map((post) => (
              <Link
                key={post.id}
                href={`/noticias/${post.id}`}
                className={styles.secondaryCard}
              >
                <div className={styles.secondaryImage}>
                  {post.imagen_portada ? (
                    <Image
                      src={post.imagen_portada}
                      alt={post.titulo}
                      fill
                      sizes="(max-width: 900px) 100vw, 25vw"
                      className={styles.image}
                    />
                  ) : (
                    <div className={styles.noImage}>
                      <span>EPA</span>
                    </div>
                  )}
                </div>

                <div className={styles.secondaryContent}>
                  <span className={styles.type}>{post.tipo}</span>

                  <h3>{post.titulo}</h3>

                  {post.resumen && (
                    <p className={styles.summary}>{post.resumen}</p>
                  )}

                  <div className={styles.cardBottom}>
                    <span className={styles.date}>
                      {formatDate(post.created_at)}
                    </span>

                    <span className={styles.readMore}>
                      Leer {post.tipo.toLowerCase()}
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
