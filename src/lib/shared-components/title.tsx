import { cn } from '@/lib/ui-utils';

function Title({ children, className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn('text-4xl font-black uppercase tracking-wider', className)}
      {...props}
    >
      {children}
    </h1>
  );
}

export { Title };
