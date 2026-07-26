import { StockStatus } from "../types";

const MAP: Record<StockStatus, { label: string; cls: string }> = {
  in_stock:     { label: "In Stock",   cls: "bg-green-50 text-green-700" },
  restocking:   { label: "Restocking", cls: "bg-gray-100 text-gray-600" },
  out_of_stock: { label: "Sold Out",   cls: "bg-red-50 text-red-600" },
};

export function StockBadge({ status }: { status: StockStatus }) {
  const s = MAP[status];
  return <span className={`rounded px-2 py-1 text-xs font-medium ${s.cls}`}>{s.label}</span>;
}
