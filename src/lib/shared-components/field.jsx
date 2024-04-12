import { Label } from '@/lib/ui/label';
import { Input } from '@/lib/ui/input';
import { cn } from '@/lib/ui-utils';

function Field({ className, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 has-[:disabled]:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function FieldLabel(props) {
  return <Label className="font-bold" {...props} />;
}

function FieldInput(props) {
  return <Input autoComplete="off" {...props} />;
}

function FieldDescription(props) {
  return (
    <p className="text-sm leading-none text-muted-foreground" {...props} />
  );
}

export { Field, FieldLabel, FieldInput, FieldDescription };
