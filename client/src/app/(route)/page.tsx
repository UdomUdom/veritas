import MOCK from "@/mock/ads.json";
import Wrapper from "@/components/container/Wrapper";
import Hero from "@/components/hero";
import Banner from "@/components/ads/Banner";
import Popular from "@/components/event/Popular";
import Upcoming from "@/components/event/Upcoming";
import New from "@/components/event/New";
import Blog from "@/components/more/Blog";
import News from "@/components/more/News";
import CallAction from "@/components/cta/CallAction";

export default function Home() {
  const ads = {
    mini: MOCK.mini,
  };

  return (
    <Wrapper>
      <Hero />
      <div className="container grid grid-cols-1 lg:grid-cols-2">
        <Banner image={ads.mini} />
        <Banner image={ads.mini} />
      </div>
      <Popular />
      <div className="container">
        <Banner image={ads.mini} />
      </div>
      <Upcoming />
      <New />
      <Blog />
      <News />
      <CallAction />
    </Wrapper>
  );
}
