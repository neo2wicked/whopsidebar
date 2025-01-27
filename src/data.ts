import { User, MetricOption, UserStatus } from './types';

export const metricOptions: MetricOption[] = [
  { id: '1', label: 'Time Spent in Whop', key: 'timeSpent', enabled: true },
  { id: '2', label: 'Revenue Generated', key: 'revenue', enabled: true },
  { id: '3', label: 'Engagement Score', key: 'engagement', enabled: false },
  { id: '4', label: 'Referrals', key: 'referrals', enabled: false },
  { id: '5', label: 'Total Purchases', key: 'purchases', enabled: false },
  { id: '6', label: 'Comments', key: 'comments', enabled: false },
  { id: '7', label: 'Likes', key: 'likes', enabled: false },
  { id: '8', label: 'Shares', key: 'shares', enabled: false },
  { id: '9', label: 'Login Streak', key: 'loginStreak', enabled: false },
  { id: '10', label: 'Completion Rate', key: 'completionRate', enabled: false },
];

const statuses: UserStatus[] = ['online', 'away', 'offline'];

// Generate random time between 0 and 24 hours in minutes
const generateRandomTime = () => {
  const maxMinutes = 24 * 60; // 24 hours in minutes
  return Math.floor(Math.random() * maxMinutes);
};

// Generate random revenue between $0 and $100,000
const generateRandomRevenue = () => {
  return Math.floor(Math.random() * 100000);
};

// Generate 100 unique users with random data
export const generateUsers = (): User[] => {
  const users: User[] = [];
  const adjectives = ['Cool', 'Swift', 'Bright', 'Quick', 'Smart', 'Tech', 'Crypto', 'Digital', 'Web3', 'Meta'];
  const nouns = ['Ninja', 'Wizard', 'Guru', 'Master', 'Pioneer', 'Builder', 'Maker', 'Creator', 'Dev', 'Pro'];

  // Background colors for avatars
  const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEEAD', 'D4A5A5', '9B9B9B', 'A3A1A8'];

  for (let i = 0; i < 100; i++) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const username = `${adj}${noun}${randomNum}`;
    
    const user: User = {
      id: `user-${i}`,
      username,
      handle: `@${adj.toLowerCase()}${noun.toLowerCase()}${randomNum}`,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${color}&color=fff&size=200&bold=true`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isTeamMember: i < 12 ? Math.random() > 0.5 : false,
      metrics: {
        timeSpent: generateRandomTime(),
        revenue: generateRandomRevenue(),
        engagement: Math.floor(Math.random() * 100),
        referrals: Math.floor(Math.random() * 50),
        purchases: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 200),
        likes: Math.floor(Math.random() * 500),
        shares: Math.floor(Math.random() * 100),
        loginStreak: Math.floor(Math.random() * 30),
        completionRate: Math.floor(Math.random() * 100),
      }
    };
    users.push(user);
  }
  return users;
};