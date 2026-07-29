import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;

export function ModalContent({
  className,
  title,
  description,
  children,
  footer,
}: {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-graphite/55 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
          "rounded-sm border border-border bg-card p-7 md:p-9 shadow-[var(--shadow-elevated)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          className,
        )}
      >
        {title && <DialogPrimitive.Title className="type-h3">{title}</DialogPrimitive.Title>}
        {description && (
          <DialogPrimitive.Description className="mt-3 type-small text-muted-foreground">
            {description}
          </DialogPrimitive.Description>
        )}
        {children && <div className="mt-6">{children}</div>}
        {footer && <div className="mt-8 flex flex-wrap justify-end gap-3">{footer}</div>}
        <DialogPrimitive.Close
          aria-label="Close"
          className="absolute right-5 top-5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
