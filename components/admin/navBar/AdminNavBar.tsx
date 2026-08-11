"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiFileText, FiLogOut } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";

import { createClient } from "@/lib/supabase/client";
import styles from "./AdminNavbar.module.css";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "Inicio",
      href: "/admin",
      icon: FiHome,
    },
    {
      name: "Animales",
      href: "/admin/animals",
      icon: FaPaw,
    },
    {
      name: "Posts",
      href: "/admin/posts",
      icon: FiFileText,
    },
  ];

  const handleLogout = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error);
      return;
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <aside className={styles.sidebar}>
      {/* Header del Sidebar */}
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>EPA</div>
      </div>

      {/* Navegación Principal */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  <Icon className={styles.navIcon} />

                  <span className={styles.navText}>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Parte Inferior */}
      <div className={styles.sidebarFooter}>
        <ul className={styles.navList}>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              <FiLogOut className={styles.navIcon} />

              <span className={styles.navText}>Cerrar sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
