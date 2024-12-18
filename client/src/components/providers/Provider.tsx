import { ToastContainer } from "react-toastify";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
      <ToastContainer />
    </section>
  );
}
