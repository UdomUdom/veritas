export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen justify-between overflow-hidden">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">404 - Not Found</h1>
        <p className="mt-4 text-lg">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
