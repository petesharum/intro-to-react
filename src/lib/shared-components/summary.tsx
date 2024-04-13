import { cn } from '@/lib/ui-utils';

type SummaryProps = {
  children: React.ReactNode;
  isPending?: boolean;
};

function Summary({ children, isPending }: SummaryProps) {
  return <dl className={cn({ 'opacity-50': isPending })}>{children}</dl>;
}

type SummaryItemProps = {
  label: string;
  detail: React.ReactNode;
  className?: string;
};

function SummaryItem({ label, detail, className }: SummaryItemProps) {
  return (
    <div className={cn('flex gap-4', className)}>
      <dt className="capitalize">{label}:</dt>
      <dd className="ml-auto text-right">{detail}</dd>
    </div>
  );
}

export { Summary, SummaryItem };
