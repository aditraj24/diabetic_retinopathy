import React from "react";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: React.ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {breadcrumb && <div className="text-xs text-gray-500 mb-1.5">{breadcrumb}</div>}
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}