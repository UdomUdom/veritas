import { useEffect, useState } from "react";
import { DatePicker as DatePick, Button } from "@heroui/react";

interface DatePickerType {
  value: string;
  change: (date: any) => void;
  props?: any;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePicker({
  value,
  change,
  props,
  minDate,
  maxDate,
}: DatePickerType) {
  const [startDate, setStartDate] = useState(value ? new Date(value) : null);

  useEffect(() => {
    setStartDate(value ? new Date(value) : null);
  }, [value]);

  return (
    <Button variant="outline" {...props}>
      <DatePick
        label="Start Date"
        labelPlacement="outside"
        name="start_date"
        defaultValue={parseDate(data?.start_date)}
        className="w-full"
        disabled={props?.disabled}
        selected={startDate}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(date) => {
          change(date?.toString());
        }}
        dateFormat="dd/MM/yyyy"
        todayButton="Today"
      />
    </Button>
  );
}
