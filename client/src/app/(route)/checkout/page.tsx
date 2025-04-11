// "use client";
import Ticket from "@/components/ticket";
// import { createSource } from "@/lib/omise";

export default function Checkout() {
  // const handleSource = async () => {
  //   try {
  //     const res = await createSource(100);
  //     console.log(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <Ticket />
    </div>
  );
}
