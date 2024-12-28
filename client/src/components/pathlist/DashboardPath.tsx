import PathCompactView from "./PathCompactView";
import { Shapes, FileStack, BookHeart } from "lucide-react";

export default function DashboardPath() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 px-0 pt-8">
      <div className="w-auto h-96 flex justify-center items-center bg-gradient-to-bl to-primary from-secondary text-primary-content">
        <PathCompactView
          title="Class"
          detail="Schedule & Assignment"
          children={<Shapes size={94} className="m-4" />}
          href="/classroom"
          button="Click me ↗"
        />
      </div>
      <div className="w-auto h-96 flex justify-center items-center bg-gradient-to-tl to-secondary from-accent text-secondary-content">
        <PathCompactView
          title="Information"
          detail="Course info & Registration"
          children={<FileStack size={94} className="m-4" />}
          href="/information"
          button="Click me ↗"
        />
      </div>
      <div className="w-auto h-96 flex justify-center items-center bg-gradient-to-bl to-accent from-success text-secondary-content ">
        <PathCompactView
          title="Organization"
          detail="Clubs & Meeting"
          children={<BookHeart size={94} className="m-4" />}
          href="/organization"
          button="Click me ↗"
        />
      </div>
    </div>
  );
}
