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
}) {
  const id = useId();
  const resolvedId = idProp || id;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={resolvedId} {...slotProps.label}>
        {label}
      </Label>
      <Input name={name} type={type} id={resolvedId} {...slotProps.input} />
    </div>
  );
}

export { Field };
