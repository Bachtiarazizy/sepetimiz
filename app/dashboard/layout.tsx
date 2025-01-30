import DashboardHeader from "./_components/dashboard-header";
import { Sidebar } from "./_components/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <DashboardHeader />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
}
