"use client";

import { useFetcher } from "@/components/fetcher";
import type { Portfolio } from "@prisma/client";

export default function PortfolioDashboard({
  params,
}: {
  params: { slug: string };
}) {
  const { data, isLoading } = useFetcher<Portfolio>(
    `/api/portfolio/${params.slug}`
  );

  return null;
}
