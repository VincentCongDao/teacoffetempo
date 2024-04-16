import AdminNav from "@/components/admin/adminnav";

export const metadata = {
  title: "TeaTempo Admin",
  description:
    "TeaTempo Admin Dashboard, user can able to see and modify their products",
};
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
