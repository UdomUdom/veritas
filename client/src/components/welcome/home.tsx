import Card from "@/components/card/Card";
import Link from "next/link";
export default function HomePage() {
  return (
    <div id="home" className="min-h-screen">
      <div className="hero skeleton min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome</h1>
            <p className="py-6">to veritas, lorem ipsum dolor sit amet</p>
            <Link href="/login">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Veritas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            Header="Lorem ipsum"
            Body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Card
            Header="Lorem ipsum"
            Body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Card
            Header="Lorem ipsum"
            Body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
      </div>
    </div>
  );
}
