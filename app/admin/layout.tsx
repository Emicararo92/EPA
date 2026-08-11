import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/navBar/AdminNavBar";
import { createClient } from "@/lib/supabase/server";
import styles from "./layout.module.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/login");
  }

  if (profile.rol !== "admin") {
    redirect("/login");
  }

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.contentArea}>{children}</div>
    </div>
  );
}
