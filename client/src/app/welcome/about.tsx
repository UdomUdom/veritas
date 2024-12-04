export default function About() {
  return (
    <div id="about" className="min-h-screen">
      <div className="hero skeleton min-h-[40vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Lorem Ipsum</h1>
            <p className="py-6">Dolor sit amet consectetur adipiscing elit</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-6">Lorem Ipsum</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-6">Dolor Sit</h2>
            <ul className="space-y-4">
              <li>
                <strong>Lorem:</strong> Ipsum dolor sit amet consectetur adipiscing elit
              </li>
              <li>
                <strong>Dolor:</strong> Sit amet consectetur adipiscing elit sed do
              </li>
              <li>
                <strong>Amet:</strong> Consectetur adipiscing elit sed do eiusmod
              </li>
              <li>
                <strong>Elit:</strong> Sed do eiusmod tempor incididunt ut labore
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}