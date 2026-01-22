
// Import React to resolve the React namespace for React.ReactNode
import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: string[];
}

export interface DashboardCard {
  title: string;
  icon: React.ReactNode;
  links: string[];
}
