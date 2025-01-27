import React, { useState, useMemo } from 'react';
import { User, MetricOption } from '../types';
import { metricOptions, generateUsers } from '../data';
import { Search, ArrowLeft, ChevronDown, Coins, Medal, Check } from 'lucide-react';

const UserSidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMetric, setSelectedMetric] = useState<MetricOption>(metricOptions[0]);
  const [metrics, setMetrics] = useState<MetricOption[]>(metricOptions);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMetricSelectorOpen, setIsMetricSelectorOpen] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) {
      return `${remainingMinutes}m`;
    }
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatMetricValue = (metric: MetricOption, value: number) => {
    switch (metric.key) {
      case 'timeSpent':
        return formatTime(value);
      case 'revenue':
        return `$${value.toLocaleString()}`;
      case 'completionRate':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const users = useMemo(() => {
    const allUsers = generateUsers();
    if (isSorted) {
      return allUsers
        .sort((a, b) => b.metrics[selectedMetric.key] - a.metrics[selectedMetric.key])
        .map((user, index) => ({ ...user, rank: index + 1 }));
    }
    return allUsers.map((user, index) => ({ ...user, rank: index + 1 }));
  }, [selectedMetric, isSorted]);

  const filteredUsers = useMemo(() => 
    users.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.handle.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [users, searchTerm]
  );

  const toggleMetric = (metric: MetricOption) => {
    setMetrics(prev => 
      prev.map(m => m.id === metric.id ? { ...m, enabled: !m.enabled } : m)
    );
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold shadow-lg">1</div>;
    if (rank === 2) return <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold shadow-lg">2</div>;
    if (rank === 3) return <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold shadow-lg">3</div>;
    return null;
  };

  const getStatusIndicator = (status: User['status']) => {
    const colors = {
      online: 'bg-green-500',
      away: 'bg-yellow-500',
      offline: 'bg-gray-400'
    };
    const labels = {
      online: 'Online',
      away: 'Away',
      offline: 'Offline'
    };
    return (
      <div className="group relative">
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 shadow-sm">
          <div className={`w-full h-full rounded-full ${colors[status]}`} />
        </div>
        <div className="absolute bottom-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
          {labels[status]}
        </div>
      </div>
    );
  };

  const enabledMetrics = metrics.filter(m => m.enabled);

  return (
    <div className="w-[800px] bg-white dark:bg-gray-800 h-screen shadow-lg flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Users <span className="text-gray-400 dark:text-gray-500 text-sm">{users.length}</span></h1>
        </div>
        <div className="relative">
          <button
            onClick={() => {
              setIsMetricSelectorOpen(!isMetricSelectorOpen);
              setIsSorted(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-gray-900 dark:text-white font-medium">{selectedMetric.label}</span>
            <ChevronDown className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${isMetricSelectorOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {isMetricSelectorOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-20">
              {metricOptions.map(metric => (
                <button
                  key={metric.id}
                  onClick={() => {
                    setSelectedMetric(metric);
                    setIsMetricSelectorOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedMetric.id === metric.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                >
                  <span className="text-gray-900 dark:text-white">{metric.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div className="p-4 relative">
        <div 
          className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="flex-1 font-medium text-gray-900 dark:text-white">Configure Visible Metrics</span>
          <ChevronDown className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
        </div>

        {isDropdownOpen && (
          <div className="absolute left-4 right-4 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 z-10">
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Select metrics to show to your users:</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Any metrics checked here will be visible to your users</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map(metric => (
                <label key={metric.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700">
                  <input
                    type="checkbox"
                    checked={metric.enabled}
                    onChange={() => toggleMetric(metric)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="font-medium text-gray-900 dark:text-white">{metric.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <div key={user.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 text-center font-medium text-gray-500 dark:text-gray-400">
                #{user.rank}
              </div>
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700"
                />
                {getRankBadge(user.rank!)}
                {getStatusIndicator(user.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-lg truncate text-gray-900 dark:text-white">{user.username}</p>
                  {user.isTeamMember && (
                    <div className="group relative">
                      <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        Whop team member
                      </div>
                    </div>
                  )}
                  <Medal className="w-4 h-4 text-yellow-500" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.handle}</p>
              </div>
              <Coins className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="grid grid-cols-2 gap-4 pl-24">
              {enabledMetrics.map(metric => (
                <div key={metric.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{metric.label}:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatMetricValue(metric, user.metrics[metric.key])}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSidebar;