import Logo from "./Logo";
import More from "./More";
import Search from "./Search";
import Profile from "./Profile";

export default function Navbar() {
  return (
    <section className="container py-8 lg:flex items-center justify-between">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="w-full lg:w-fit flex justify-between items-center gap-6">
          <Logo />
          <div className="lg:hidden flex items-center gap-6">
            <More />
            <Profile />
          </div>
        </div>
        <Search />
      </div>
      <div className="hidden lg:flex items-center gap-6">
        <More />
        <Profile />
      </div>
    </section>
  );
}
