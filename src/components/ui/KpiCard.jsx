import { ArrowUp, ArrowDown } from "lucide-react";

export default function KpiCard({
  title,
  value,
  change,
  comparison,
  icon: Icon,
  iconColor,
  iconBg,
  positive = true,
}) {
  return (
    <div className="rounded-[18px] p-[2px]"
    style={{background: "linear-gradient(135deg, #3391d8 0%, #33d8c0 92%, #1abece 100%);"}}
    >
 <div
  className="
      rounded-[16px]
      bg-white
      px-3
      py-2
      min-h-[140px]
      transition-all
      duration-300
      ease-in-out
      hover:bg-[#F8FAFC]
      hover:shadow-[0_6px_16px_rgba(15,23,42,0.08)]
    "
>
       <div className="flex h-full justify-between items-start">
  {/* Left Content */}
  <div className="flex flex-col flex-1">
    <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#64748B]">
      {title}
    </p>

    <h3 className="mt-8 text-[18px] font-bold text-[#0F172A]">
      {value}
    </h3>

    <div className="mt-3 flex items-center gap-1">
      <span
        className={`flex items-center gap-1 text-[12px] font-semibold ${
          positive
            ? "text-[#10B981]"
            : "text-[#F59E0B]"
        }`}
      >
        {positive ? (
          <ArrowUp size={12} />
        ) : (
          <ArrowDown size={12} />
        )}

        {change}
      </span>

      <span className="text-[11px] text-[#94A3B8]">
        {comparison}
      </span>
    </div>
  </div>

  {/* Right Icon */}
  {Icon && (
    <div
      className="
        h-10
        w-10
        rounded-xl
        flex
        items-center
        justify-center
        shrink-0
      "
      style={{
        backgroundColor: iconBg,
      }}
    >
      <Icon
        size={18}
        style={{
          color: iconColor,
        }}
      />
    </div>
  )}
</div>
      </div>
    </div>
  );
}