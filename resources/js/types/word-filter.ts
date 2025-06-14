import { Link } from "@/types/index";

export type WordFilter = {
  id: number;
  word: string;
  replacement: string;
  created_at: string;
  updated_at: string;
};

export interface WordFilterPaginationProps {
  current_page: number;
  data: WordFilter[];
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
