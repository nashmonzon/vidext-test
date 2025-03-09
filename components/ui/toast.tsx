"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

const promisifiedToast = <T,>(
  promise: Promise<T>,
  {
    success,
    error,
    loading,
  }: {
    success: string;
    error: string;
    loading: string;
  }
): Promise<T> => {
  return new Promise((resolve, reject) => {
    toast.promise(promise, {
      loading,
      success: (r) => {
        resolve(r);
        return success;
      },
      error: (e) => {
        reject(e);
        return error;
      },
    });
  });
};

export { Toaster, toast, promisifiedToast };
