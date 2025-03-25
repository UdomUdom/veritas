import Logo from "./Logo";

export default function Navbar() {
  return (
    <section className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Logo />
        <input type="text" placeholder="Search" />
      </div>
      <div className="flex items-center gap-6">
        <div>DarkMode</div>
        <button className="font-semibold">Login / Signup</button>
      </div>
    </section>
  );
}
