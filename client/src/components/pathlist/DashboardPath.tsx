import EnrollCompact from "../enrollment/EnrollCompact";

export default function DashboardPath() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 px-0 py-6 ">
      <div className="w-96 h-96 flex justify-center items-center">
        <EnrollCompact />
      </div>
      <div className="w-96 h-96 flex justify-center items-center">
        <EnrollCompact />
      </div>
      <div className="w-96 h-96 flex justify-center items-center">
        <EnrollCompact />
      </div>
    </div>
  );
}
