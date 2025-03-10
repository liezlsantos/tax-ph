import { Input } from "@heroui/input";
import { ReactElement } from "react";

type AmountInputProperties = {
  label: string;
  name: string;
  isRequired?: boolean;
};

export function AmountInput({
  label,
  name,
  isRequired = false,
}: AmountInputProperties): ReactElement {
  return (
    <Input
      name={name}
      label={label}
      isRequired={isRequired}
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
