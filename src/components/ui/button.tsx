import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { RiLoader4Line } from 'react-icons/ri'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition duration-100 active:translate-y-0.5 active:opacity-90',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground hover:bg-primary/90 text-white',
				danger: 'bg-danger text-white hover:bg-danger/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				success: 'bg-success text-white hover:bg-success/90',
				info: 'bg-info text-white hover:bg-info/90',
				warning: 'bg-warning text-white hover:bg-warning/90',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonCompProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const ButtonComp = React.forwardRef<HTMLButtonElement, ButtonCompProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)

ButtonComp.displayName = 'ButtonComp'

interface ButtonProps extends ButtonCompProps {
	isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ isLoading, disabled, children, ...rest }, ref) => {
		return (
			<ButtonComp {...rest} disabled={isLoading || disabled} ref={ref}>
				{isLoading ? (
					<>
						{' '}
						<RiLoader4Line className="mr-2 animate-spin" /> {children}
					</>
				) : (
					children
				)}
			</ButtonComp>
		)
	},
)

Button.displayName = 'Button'

export { Button, buttonVariants }
