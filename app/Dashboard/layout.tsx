import DashboardNav from "./_components/dashboardNav";
import DashboardFooter from "./_components/dashboardFooter";
import { DashboardHeader } from "./_components/DashboardHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <DashboardHeader />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <DashboardNav />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
}
