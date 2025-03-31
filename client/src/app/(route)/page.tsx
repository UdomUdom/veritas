import Wrapper from "@/components/container/Wrapper";
import Hero from "@/components/hero";
import Banner from "@/components/ads/Banner";
import Popular from "@/components/event/Popular";
import Upcoming from "@/components/event/Upcoming";
import New from "@/components/event/New";
import Blog from "@/components/more/Blog";
import CallAction from "@/components/cta/CallAction";

export default function Home() {
  return (
    <Wrapper>
      <Hero />
      <Banner q="1" />
      <Popular />
      <Banner q="2" />
      <Upcoming />
      <New />
      <Blog />
      <CallAction />
    </Wrapper>
  );
}
