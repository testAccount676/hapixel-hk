type CatalogPage = {
  id: number;
  caption: string;
  caption_br: string;
  club_only: "0" | "1";
  enabled: "0" | "1";
  extra_data: string;
  icon_image: number;
  link: string;
  min_rank: number;
  min_sub: number;
  order_num: number;
  page_headline: string;
  page_images: string[];
  page_layout: string;
  page_special: string | null;
  page_teaser: string | null;
  page_text_1: string | null;
  page_text_2: string | null;
  page_text_details: string | null;
  page_text_teaser: string | null;
  page_texts: string[];
  parent_id: number;
  temporary_icon_image: string | null;
  type: string;
  vip_only: "0" | "1";
  visible: "0" | "1";
};

export type CatalogItem = {
  achievement: number;
  amount: number;
  badge_id: string;
  catalog_name: string;
  cost_credits: number;
  cost_diamonds: number;
  cost_pixels: number;
  cost_seasonal: number;
  cost_stars: number;
  cost_tokens: number;
  extra_points: string;
  extradata: string;
  furniture_item_name: string;
  flat_id: number;
  id: number;
  item_ids: string;
  limited_sells: number;
  limited_stack: number;
  offer_active: string;
  order_num: number;
  page_id: number;
  song_id: number;
  vip: string;
};

type Link = {
  active: boolean;
  label: string;
  url: string | null;
};

export interface CatalogItemsPaginationProps {
  current_page: number;
  data: CatalogItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface CatalogPagesPaginationProps {
  current_page: number;
  data: CatalogPage[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
