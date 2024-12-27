import Link from "next/link";
import { Bird } from "lucide-react";

export default function EnrollCompact() {
  return (
    <section>
      <div className="card bg-base-300 w-80 h-80 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Enrollment</h2>
          <p className="flex ">
            Join the full enrollment <br />
            veritas
          </p>
          <Bird size={96} />
          <div className="card-actions">
            <Link href="#">
              <button className="btn btn-primary btn-xs">
                Full Enrollment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
