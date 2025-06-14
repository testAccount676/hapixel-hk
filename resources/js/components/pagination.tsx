import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type LinkType = {
  active: boolean;
  label: string;
  url: string | null;
};

export interface PaginationProps<T = unknown> {
  data: T[];
  current_page: number;
  from: number;
  last_page: number;
  links: LinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export default function Pagination<T = unknown>({ pagination }: { pagination: PaginationProps<T> }) {
  const hasData = pagination.data.length > 0;

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-10 sm:justify-between">
      <div>
        {hasData ? (
          <>
            {pagination.from} - {pagination.to} de {pagination.total}
          </>
        ) : (
          <p className="text-sm">Nenhum item encontrado</p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {pagination.links.map((link, index) => {
          const isDisabled = !link.url;
          const isPrev = link.label === "pagination.previous";
          const isNext = link.label === "pagination.next";

          let content;
          if (isPrev) content = <FiChevronLeft />;
          else if (isNext) content = <FiChevronRight />;
          else content = link.label;

          if (isDisabled) {
            return (
              <Button key={index} variant="outline" disabled className="pointer-events-none opacity-50">
                {content}
              </Button>
            );
          }

          return (
            <Button key={index} asChild variant={link.active ? "default" : "outline"}>
              <Link href={link.url!}>{content}</Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
