import React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef(({ className, variant = 'default', hover = false, ...props }, ref) => {
  const variants = {
    default: 'bg-white border border-gray-200 shadow-soft',
    elevated: 'bg-white border border-gray-100 shadow-medium',
    glass: 'glass-effect border border-white/20',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-soft'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl transition-all duration-300',
        variants[variant],
        hover && 'card-hover',
        className
      )}
      {...props}
    />
  );
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-bold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };