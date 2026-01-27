'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import AnalyticsTab from '@/components/dashboard/AnalyticsTab';
import PropertiesTab from '@/components/dashboard/PropertiesTab';
import OrdersTab from '@/components/dashboard/OrdersTab';
import DevelopersTab from '@/components/dashboard/DevelopersTab';
import BlogsTab from '@/components/dashboard/BlogsTab';
import CustomersTab from '@/components/dashboard/CustomersTab';
import LocationManager from '@/components/dashboard/LocationManager';


export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('analytics');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsTab />;
      case 'properties':
        return <PropertiesTab />;
      case 'orders':
        return <OrdersTab />;
      case 'developers':
        return <DevelopersTab />;
      case 'locations':
        return <LocationManager />;
      case 'blogs':
        return <BlogsTab />;
      case 'customers':
        return <CustomersTab />;
      default:
        return <AnalyticsTab />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </DashboardLayout>
  );
}

