import Breadcrumb from "@/components/adminComponents/breadcrumb";

export default function Profile() {
  return (
    <section className="container mx-auto bg-base-200 pt-8">
      <div className="p-4">
        <Breadcrumb
          paths={[
            { name: "Admin", href: "/admin" },
            { name: "Profile", href: "/admin/profile" },
          ]}
        />
        <div>page</div>
      </div>
    </section>
  );
}
