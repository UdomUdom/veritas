import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import Circle from "../build/Circle";

interface OrderProgressProps {
  progress: number;
}

export default function OrderProgress({ progress = 0 }: OrderProgressProps) {
  const first = progress > 0 ? 100 : 0;
  const second = progress > 50 ? 100 : 0;

  return (
    <div className="max-w-lg mx-auto px-8">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="relative">
          <Circle
            className={`
          ${first === 0 ? "bg-green-500 text-white" : ""}
          ${first === 100 ? "bg-white border-2 border-green-500" : ""}`}
          >
            {first === 100 ? (
              <Check className={first === 100 ? "text-green-500" : ""} />
            ) : (
              <span>1</span>
            )}
          </Circle>
          <span className="absolute top-full -translate-x-1/2 mt-2 w-full text-center text-sm text-muted-foreground">
            Checkout
          </span>
        </div>
        <Progress
          value={first}
          className={`${first === 100 ? "[&>div]:bg-green-500" : ""}`}
        />
        <div className="relative">
          <Circle
            className={`
          ${first === 100 ? "bg-green-500 text-white" : ""}
          ${second === 100 ? "bg-white border-2 border-green-500" : ""}`}
          >
            {second === 100 ? (
              <Check className={second === 100 ? "text-green-500" : ""} />
            ) : (
              <span>2</span>
            )}
          </Circle>
          <span className="absolute top-full -translate-x-1/2 mt-2 w-full text-center text-sm text-muted-foreground">
            Payment
          </span>
        </div>
        <Progress
          value={second}
          className={`${second === 100 ? "[&>div]:bg-green-500" : ""}`}
        />
        <div className="relative">
          <Circle
            className={`${
              second === 100 ? "bg-white border-2 border-green-500" : ""
            }`}
          >
            {second === 100 ? (
              <Check className={second === 100 ? "text-green-500" : ""} />
            ) : (
              <span>3</span>
            )}
          </Circle>
          <span className="absolute top-full -translate-x-1/2 mt-2 w-full text-center text-sm text-muted-foreground">
            Complete
          </span>
        </div>
      </div>
    </div>
  );
}
