import React from "react";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: React.ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumb && <div className="text-sm text-secondary mb-2">{breadcrumb}</div>}
      <h1 className="text-2xl font-bold text-primary">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-secondary">{subtitle}</p>}
    </div>
  );
}
