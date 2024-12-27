import CompactView from "@/components/calendar/CompactView";
import Avatar from "@/components/user/Avatar";
import FooterBar from "@/components/footer/FooterBar";
import DashboardPath from "@/components/pathlist/DashboardPath";

export default function Dashboard() {
  return (
    <section>
      <div className="container mx-auto px-4 bg-base-200 py-8">
        <div className="flex w-full flex-col lg:flex-row ">
          <div className="flex justify-center rounded-box flex-grow p-4">
            <CompactView />
          </div>
          <div className="divider lg:divider-horizontal flex items-center"></div>
          <div className="flex justify-center rounded-box flex-grow p-4">
            <Avatar />
          </div>
        </div>
        <div className="flex justify-center ">
          <DashboardPath />
        </div>
      </div>
      <div className="mx-auto">
        <FooterBar />
      </div>
    </section>
  );
}
