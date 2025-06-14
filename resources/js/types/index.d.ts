import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import type { Config } from "ziggy-js";

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  groupName?: string;
  title: string;
  href: string;
  icon?: LucideIcon | IconType | null;
  isActive?: boolean;
}

export interface FooterNavItem {
  title: string;
  href: string;
  icon?: LucideIcon | IconType | null;
  isActive?: boolean;
}

export interface SharedData {
  username: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
}

export type Link = {
  active: boolean;
  label: string;
  url: string | null;
};

export interface User {
  id: number;
  username: string;
  email: string;
  email_verified_at: string | null;
  auth_ticket: string;
  public_id: string;
  motto: string;
  gender: string;
  figure: string;
  rank: number;
  credits: number;
  activity_points: number;
  achievement_points: number;
  seasonal_points: number;
  bonus_points: number;
  vip_points: number;
  black_money: number;
  kisses: number;
  games_win: number;
  snow_xp: number;
  xp: number;
  xp_points: number;
  level: number;
  view_points: number;
  job: string;
  favourite_group: number;
  tag: string;
  tag_colour: string;
  name_colour: string;
  emoji_enabled: string;
  online: string;
  hidden_staff: number;
  is_beta: number;
  last_ip: string;
  last_online: number;
  endvip_timestamp: number;
  machine_id: string | null;
  time_muted: number;
  reg_date: string;
  reg_ip: string | null;
  reg_timestamp: number;
  remember_token: string;
  pin: string | null;
  beta_code: string | null;
  [key: string]: unknown; // This allows for additional properties...
}

type LengthAwarePaginator<T> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
};

