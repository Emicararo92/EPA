"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPaw, FaEnvelope, FaLock } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logoIconWrapper}>
            <FaPaw className={styles.logoIcon} />
          </div>
          <h1 className={styles.logoText}>EPA</h1>
        </div>

        {/* Título */}
        <div className={styles.header}>
          <h2 className={styles.title}>Iniciar sesión</h2>
          <p className={styles.subtitle}>Accede al panel de administración</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Correo electrónico
            </label>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.inputIcon} />
              <input
                type="email"
                id="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} />
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
                autoComplete="current-password"
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Footer */}
        <p className={styles.footer}>Sistema de administración EPA</p>
      </div>
    </div>
  );
}
