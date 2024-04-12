import { Label } from '@/lib/ui/label';
import { Input } from '@/lib/ui/input';
import { cn } from '@/lib/ui-utils';

function Field({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 has-[:disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function FieldLabel({ children, ...props }) {
  return (
    <Label className="font-bold" {...props}>
      {children}
    </Label>
  );
}

function FieldInput(props) {
  return <Input autoComplete="off" {...props} />;
}

function FieldDescription({ children, ...props }) {
  return (
    <p className="text-sm leading-none text-muted-foreground" {...props}>
      {children}
    </p>
  );
}

export { Field, FieldLabel, FieldInput, FieldDescription };
