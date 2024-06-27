import AdminFooter from "./_components/AdminFooter";
import AdminHeader from "./_components/AdminHeader";
import AdminSideBar from "./_components/AdminSideBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <AdminHeader />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <AdminSideBar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
      <div className="md:pl-56 bottom-0 fixed w-full z-50">
        <AdminFooter />
      </div>
    </div>
  );
}
