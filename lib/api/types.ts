export interface LiveEvent {
  id: string;
  title: string;
  description: null | string;
  date: string;
  time: string;
  venue: string;
  city: string;
  capacity: null | number;
  status: string;
  status_type: "active" | "progress" | "planned";
  cta_text: null | string;
  cta_link: null | string;
  created_at: null | string;
  updated_at: null | string;
}

export interface PastShow {
  id: string;
  title: string;
  description: null | string;
  date: string;
  venue: string;
  city: string;
  capacity: null | number;
  attendance: null | number;
  highlight_link: null | string;
  created_at: null | string;
  updated_at: null | string;
}

export interface VenuePartnership {
  id: string;
  name: string;
  city: string;
  capacity: null | string;
  type: string;
  description: null | string;
  status: string;
  status_type: "active" | "progress" | "planned";
  logo_url: null | string;
  contact_email: null | string;
  created_at: null | string;
  updated_at: null | string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: null | string;
  featured_image_url: null | string;
  status: "draft" | "published";
  created_at: null | string;
  updated_at: null | string;
  published_at: null | string;
}

export interface LiveMetric {
  id: string;
  label: string;
  value: string;
  period: null | string;
  trend: null | string;
  trend_direction: null | "up" | "down";
  created_at: null | string;
  updated_at: null | string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: null | T;
  error?: string;
  timestamp: string;
}
