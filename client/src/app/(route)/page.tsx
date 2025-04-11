import Wrapper from "@/components/container/Wrapper";
import Hero from "@/components/hero";
// import Banner from "@/components/ads/Banner";
import Recommend from "@/components/event/Recommend";
import Upcoming from "@/components/event/Upcoming";
import New from "@/components/event/New";
import Blog from "@/components/blog";
// import CallAction from "@/components/cta/CallAction";

export default function Home() {
  return (
    <Wrapper>
      <Hero />
      {/* <Banner q="1" /> */}
      <Recommend />
      {/* <Banner q="2" /> */}
      <Upcoming />
      <New />
      <Blog />
      {/* <CallAction /> */}
    </Wrapper>
  );
}
