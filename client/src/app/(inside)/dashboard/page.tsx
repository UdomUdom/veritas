import CompactView from "@/components/calendar/CompactView";
import Avatar from "@/components/user/Avatar";

export default function Dashboard() {
  return (
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4">
        <div className="flex justify-center">
          <CompactView />
        </div>
        <div className="md:col-span-2 md:row-span-2 flex justify-center m-14">
          <Avatar />
        </div>
        <div className="flex justify-center">3</div>
      </div>
    </section>
  );
}
