export type UserStatus = 'online' | 'away' | 'offline';

export interface User {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  rank?: number;
  status: UserStatus;
  isTeamMember?: boolean;
  metrics: {
    timeSpent: number;
    revenue: number;
    engagement: number;
    referrals: number;
    purchases: number;
    comments: number;
    likes: number;
    shares: number;
    loginStreak: number;
    completionRate: number;
  };
}