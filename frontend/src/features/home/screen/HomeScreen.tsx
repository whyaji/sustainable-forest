import {
  BarChart3,
  Calendar,
  Camera,
  Eye,
  MapPin,
  Plus,
  Shield,
  TreePine,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomeScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const statsData = [
    {
      value: 1247,
      label: 'Total Adopters',
      unit: 'Users',
      icon: <Users className="h-6 w-6" />,
      color: '#10b981',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      value: 3456,
      label: 'Trees Adopted',
      unit: 'Trees',
      icon: <TreePine className="h-6 w-6" />,
      color: '#22c55e',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      change: '+8.2%',
      changeType: 'positive',
    },
    {
      value: 89,
      label: 'Active Communities',
      unit: 'Groups',
      icon: <MapPin className="h-6 w-6" />,
      color: '#3b82f6',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      change: '+15.3%',
      changeType: 'positive',
    },
    {
      value: 2134,
      label: 'Photos Uploaded',
      unit: 'Images',
      icon: <Camera className="h-6 w-6" />,
      color: '#f59e0b',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      change: '+5.7%',
      changeType: 'positive',
    },
    {
      value: 156,
      label: 'Pending Verifications',
      unit: 'Items',
      icon: <Shield className="h-6 w-6" />,
      color: '#ef4444',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      change: '-3.2%',
      changeType: 'negative',
    },
    {
      value: 98.7,
      label: 'System Health',
      unit: '%',
      icon: <BarChart3 className="h-6 w-6" />,
      color: '#8b5cf6',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      change: '+0.5%',
      changeType: 'positive',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'adoption',
      user: 'Ahmad Rizki',
      action: 'adopted tree #SF-2024-001',
      time: '2 minutes ago',
      icon: <TreePine className="h-4 w-4 text-green-600" />,
    },
    {
      id: 2,
      type: 'upload',
      user: 'Sarah Chen',
      action: 'uploaded progress photo',
      time: '15 minutes ago',
      icon: <Camera className="h-4 w-4 text-blue-600" />,
    },
    {
      id: 3,
      type: 'community',
      user: 'Budi Santoso',
      action: 'joined community "Hutan Lestari"',
      time: '1 hour ago',
      icon: <Users className="h-4 w-4 text-purple-600" />,
    },
    {
      id: 4,
      type: 'verification',
      user: 'System',
      action: 'verified 5 tree documents',
      time: '2 hours ago',
      icon: <Shield className="h-4 w-4 text-orange-600" />,
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: 'Review Tree Adoption Request',
      description: 'Process 12 new adoption applications',
      priority: 'high',
      count: 12,
    },
    {
      id: 2,
      title: 'Verify Photo Submissions',
      description: 'Review uploaded progress photos',
      priority: 'medium',
      count: 8,
    },
    {
      id: 3,
      title: 'Community Moderation',
      description: 'Check community posts and comments',
      priority: 'low',
      count: 3,
    },
    {
      id: 4,
      title: 'System Maintenance',
      description: 'Scheduled backup and updates',
      priority: 'medium',
      count: 1,
    },
  ];

  // Stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === 'animate-stats') {
            statsData.forEach((item, index) => {
              const targetValue = item.value;
              let currentValue = 0;
              const increment = Math.ceil(targetValue / 60);

              const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                  currentValue = targetValue;
                  clearInterval(interval);
                }
                setAnimatedValues((prev) => {
                  const newValues = [...prev];
                  newValues[index] = currentValue;
                  return newValues;
                });
              }, 30);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsElement = document.getElementById('animate-stats');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="animate-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const fadeInClass = (id: string) =>
    isVisible[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div>
        {/* Dashboard Content */}
        <main className="p-6">
          {/* Section show that is just example, on development */}
          <section className="mb-6">
            <div
              id="animate-header"
              className={`transition-all duration-1000 ${fadeInClass('animate-header')}`}>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
              <p className="text-gray-600">
                Welcome to your dashboard! Here you can find an overview of your activities and
                system status.
              </p>
              <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded">
                This is just an example dashboard. Features are under development.
              </div>
            </div>
          </section>
          {/* Stats Overview */}
          <section className="mb-8">
            <div
              id="animate-stats"
              className={`transition-all duration-1000 ${fadeInClass('animate-stats')}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {statsData.map((item, index) => {
                  const animatedValue = animatedValues[index];

                  return (
                    <Card
                      key={index}
                      className={`${item.bgColor} ${item.borderColor} border hover:shadow-lg transition-shadow`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2 rounded-lg bg-white/80">
                            <div style={{ color: item.color }}>{item.icon}</div>
                          </div>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              item.changeType === 'positive'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                            {item.change}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-baseline space-x-1">
                            <span className="text-2xl font-bold text-gray-900">
                              {item.unit === '%'
                                ? animatedValue.toFixed(1)
                                : Math.floor(animatedValue).toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 uppercase">{item.unit}</span>
                          </div>
                          <p className="text-xs text-gray-600 font-medium">{item.label}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              task.priority === 'high'
                                ? 'bg-red-100 text-red-800'
                                : task.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}>
                            {task.priority}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            {task.count}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{task.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: <Plus className="h-5 w-5" />,
                  label: 'Add New Tree',
                  color: 'bg-green-600',
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  label: 'Manage Users',
                  color: 'bg-blue-600',
                },
                {
                  icon: <Shield className="h-5 w-5" />,
                  label: 'Review Verifications',
                  color: 'bg-orange-600',
                },
                {
                  icon: <BarChart3 className="h-5 w-5" />,
                  label: 'Generate Report',
                  color: 'bg-purple-600',
                },
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`${action.color} text-white border-0 hover:opacity-90 h-16 flex-col space-y-2`}>
                  {action.icon}
                  <span className="text-sm">{action.label}</span>
                </Button>
              ))}
            </div>
          </section>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Security</h3>
                  <p className="text-sm text-green-600">All systems secure</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Performance</h3>
                  <p className="text-sm text-blue-600">Optimal performance</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Backup</h3>
                  <p className="text-sm text-purple-600">Last backup: 2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <style>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out;
          }
        `}
      </style>
    </div>
  );
}
