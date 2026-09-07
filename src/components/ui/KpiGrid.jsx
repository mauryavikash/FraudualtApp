import KpiCard from "./KpiCard";

export default function KpiGrid({
  items = [],
  columns = "xl:grid-cols-5",
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${columns}`}
    >
      {items.map((item) => (
        <KpiCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  );
}