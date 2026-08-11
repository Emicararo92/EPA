import NavBar from "@/components/public/Navbar/Navbar";

import styles from "./PublicLayout.module.css";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
