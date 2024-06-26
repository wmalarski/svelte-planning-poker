import type { Button as ButtonPrimitive } from 'bits-ui';

import { type VariantProps, tv } from 'tailwind-variants';

import Root from './button.svelte';

const buttonVariants = tv({
	base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	defaultVariants: {
		size: 'default',
		variant: 'default'
	},
	variants: {
		size: {
			default: 'h-10 px-4 py-2',
			icon: 'size-10',
			lg: 'h-11 rounded-md px-8',
			sm: 'h-9 rounded-md px-3'
		},
		variant: {
			default: 'bg-primary text-primary-foreground hover:bg-primary/90',
			destructive:
				'bg-destructive text-destructive-foreground hover:bg-destructive/90',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			link: 'text-primary underline-offset-4 hover:underline',
			outline:
				'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
		}
	}
});

type Variant = VariantProps<typeof buttonVariants>['variant'];
type Size = VariantProps<typeof buttonVariants>['size'];

type Props = {
	isLoading?: boolean;
	size?: Size;
	variant?: Variant;
} & ButtonPrimitive.Props;

type Events = ButtonPrimitive.Events;

export {
	type Events,
	type Events as ButtonEvents,
	type Props,
	type Props as ButtonProps,
	Root,
	//
	Root as Button,
	buttonVariants
};
