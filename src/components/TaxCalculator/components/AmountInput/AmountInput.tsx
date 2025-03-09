import { Input } from "@heroui/input";
import { ReactElement } from "react";

type AmountInputProperties = {
  label: string;
  name: string;
  value?: string;
};

export function AmountInput({
  label,
  name,
  value,
}: AmountInputProperties): ReactElement {
  return (
    <Input
      name={name}
      label={label}
      value={value}
      type="number"
      labelPlacement="outside"
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">₱</span>
        </div>
      }
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">PHP</span>
        </div>
      }
    />
  );
}
