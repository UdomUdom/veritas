import CompactView from "@/components/calendar/CompactView";
import EnrollCompact from "@/components/enrollment/EnrollCompact";
import Avatar from "@/components/user/Avatar";
import FooterBar from "@/components/footer/FooterBar";

export default function Dashboard() {
  return (
    <section>
      <div className="container mx-auto px-4 bg-base-200">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4">
          <div className="flex justify-center ml-36">
            <CompactView />
          </div>
          <div className="md:col-span-2 md:row-span-2 flex justify-center m-14">
            <Avatar />
          </div>
          <div className="flex justify-center ml-36"></div>
          <div className="flex justify-center ">
            <EnrollCompact />
          </div>
          <div className="flex justify-center ">
            <EnrollCompact />
          </div>
          <div className="flex justify-center ">
            <EnrollCompact />
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <FooterBar />
      </div>
    </section>
  );
}
