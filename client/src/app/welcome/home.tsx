export default function HomePage() {
  return (
    <div id="home" className="min-h-screen">
      <div className="hero skeleton min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome</h1>
            <p className="py-6">to veritas, lorem ipsum dolor sit amet</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Veritas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h3 className="card-title">Lorem ipsum</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h3 className="card-title">Lorem ipsum</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h3 className="card-title">Lorem ipsum</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}