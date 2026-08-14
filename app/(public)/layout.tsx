import NavBar from "@/components/public/Navbar/Navbar";

import styles from "./PublicLayout.module.css";
import Footer from "@/components/public/Footer/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Footer/>
    </div>
  );
}
