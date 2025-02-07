import Button from "@/components/button/Button";

export default function FormElements() {
  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <h2 className="card-title">Add Profile</h2>
      <form className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" className="input input-bordered" />
        </div>
        <Button type="submit" className="btn btn-primary" text="Save" />
      </form>
    </div>
  );
}
