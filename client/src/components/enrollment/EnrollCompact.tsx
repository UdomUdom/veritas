import Link from "next/link";

export default function EnrollCompact() {
  return (
    <section>
      <div className="card bg-base-300 w-80 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Enrollment</h2>
          <p>Join the full enrollment</p>
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
