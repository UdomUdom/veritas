import ProfileCard from "@/components/card/ProfileCard";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <hr className="opacity-10" />
      <div className="container">
        <h1 className="my-4 text-2xl font-semibold">My Wallet</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <ProfileCard />
          {children}
        </div>
      </div>
    </div>
  );
}
