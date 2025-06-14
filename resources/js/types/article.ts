type Article = {
  author_id: string;
  category: "General" | "Update" | "Activity" | "Promotion";
  created_at: string;
  id: number;
  author: string;
  short_story: string;
  image: string | null;
  long_story: string;
  title: string;
  updated_at: string;
};

type Link = {
  active: boolean;
  label: string;
  url: string | null;
};

export interface ArticlePaginationProps {
  current_page: number;
  data: Article[];
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
