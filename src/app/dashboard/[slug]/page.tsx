"use client";

import type { Portfolio } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function PortfolioDashboard({
  params,
}: {
  params: { slug: string };
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["portfolio", params.slug],
    queryFn: () =>
      axios
        .get<Portfolio>(`/api/portfolio/${params.slug}`)
        .then((res) => res.data),
  });

  return null;
}
