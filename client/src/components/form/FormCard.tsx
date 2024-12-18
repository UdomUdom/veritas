export default function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="card bg-neutral text-neutral-content w-96 shadow-lg">
      <div className="card-body items-center text-center">{children}</div>
    </div>
  );
}
