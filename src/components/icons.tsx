import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Icons = {
  Logo: ({ className, ...props }: React.ComponentProps<'svg'>) => (
    <BrainCircuit className={cn('h-6 w-6', className)} {...props} />
  ),
};
