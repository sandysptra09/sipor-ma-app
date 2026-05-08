// components/customs/admin/log-item.tsx

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface LogItemProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actor: string;
    date: string;
    time: string;
    iconClassName?: string;
    className?: string;
}

export function LogItem({
    icon: Icon,
    title,
    description,
    actor,
    date,
    time,
    iconClassName,
    className,
}: LogItemProps) {
    return (
        <div className={cn("flex items-start gap-4 ", className)}>
            {/* Icon */}
            <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl shrink-0 bg-primary/20",
                iconClassName
            )}>
                <Icon size={18} />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#181C1C]">{title}</p>
                <p className="text-xs text-slate-500">{description}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                    OLEH: <span className="uppercase">{actor}</span> • {date}, {time}
                </p>
            </div>
        </div>
    );
}