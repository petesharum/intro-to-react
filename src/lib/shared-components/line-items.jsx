import { cn } from '@/lib/ui-utils';

function LineItems({ children, isPending }) {
  return <dl className={cn({ 'opacity-50': isPending })}>{children}</dl>;
}

function LineItem({ label, detail, className }) {
  return (
    <div className={cn('flex gap-4', className)}>
      <dt className="capitalize">{label}:</dt>
      <dd className="ml-auto text-right">{detail}</dd>
    </div>
  );
}

export { LineItems, LineItem };
