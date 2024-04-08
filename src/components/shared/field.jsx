import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function Field({
  className,
  label,
  id: idProp,
  name,
  type = 'text',
  slotProps = {},
  description,
}) {
  const id = useId();
  const resolvedId = idProp || id;
  return (
    <div
      className={cn(
        'flex flex-col gap-2 has-[:disabled]:opacity-50',
        className,
      )}
    >
      <Label htmlFor={resolvedId} className="font-bold" {...slotProps.label}>
        {label}
      </Label>
      <Input
        name={name}
        type={type}
        id={resolvedId}
        aria-describedby={`${resolvedId}-description`}
        {...slotProps.input}
      />
      <p
        id={`${resolvedId}-description`}
        className="text-sm leading-none text-muted-foreground"
      >
        {description}
      </p>
    </div>
  );
}

export { Field };
