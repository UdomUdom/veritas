import { Button } from "@/components/ui/button";
import Ticket from "@/components/ticket";

export default function Testing() {
  return (
    <div>
      <div className="container flex gap-2 mb-8">
        <Button variant="default">default</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
      </div>

      <div className="mb-8">
        <Ticket />
      </div>
    </div>
  );
}
