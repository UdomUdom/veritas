import AvatarGroup from "./AvatarGroup";
import Link from "next/link";

export default function Avatar() {
  return (
    <div>
      <Link href="/settings" className="">
        <div className={`avatar`}>
          <div className="w-72 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </Link>
      <div className="mt-4">
        <AvatarGroup />
      </div>
      <Link href="/settings" className="flex justify-center m-6">
        <button className="btn btn-outline mt-4 btn-sm btn-wide">
          Edit Profile
        </button>
      </Link>
    </div>
  );
}
