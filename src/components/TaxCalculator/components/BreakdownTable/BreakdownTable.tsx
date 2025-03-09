import { ReactElement } from "react";

import { formatAmount } from "components/lib";

export type BreakdownItem = {
  label: string;
  amount: number;
};

type BreakdownTableProperties = {
  title: string;
  items: BreakdownItem[];
};

export function BreakdownTable({
  title,
  items,
}: BreakdownTableProperties): ReactElement {
  return (
    <div>
      <div className="py-2 card-title">{title}</div>
      {items.map(({ label, amount }) => (
        <div key={label} className="flex w-full py-1">
          <div className="flex-grow">{label}</div>
          <div>₱ {formatAmount(amount)}</div>
        </div>
      ))}
    </div>
  );
}
