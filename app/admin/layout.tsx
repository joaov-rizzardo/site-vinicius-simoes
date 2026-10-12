import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Área admin – Vinicius Vicente Simões",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm">{children}</div>;
}
