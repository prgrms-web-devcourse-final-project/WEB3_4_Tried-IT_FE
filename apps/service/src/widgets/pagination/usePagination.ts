import { PaginationModel } from "@/entities/model/pagination/pagination.model";
import { useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface UsePaginationOptions {
  defaultPage?: number;
  defaultSize?: number;
}

interface UsePaginationReturn {
  page: number;
  size: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  paginationModel: PaginationModel;
}

export const usePagination = ({
  defaultPage = 1,
  defaultSize = 10,
}: UsePaginationOptions = {}): UsePaginationReturn => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = useMemo(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam, 10) : defaultPage;
  }, [searchParams, defaultPage]);

  const size = useMemo(() => {
    const sizeParam = searchParams.get("size");
    return sizeParam ? parseInt(sizeParam, 10) : defaultSize;
  }, [searchParams, defaultSize]);

  const setPage = useCallback(
    (newPage: number) => {
      if (newPage === page) return;
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      navigate({ search: params.toString() });
    },
    [searchParams, navigate, page]
  );

  const setSize = useCallback(
    (newSize: number) => {
      if (newSize === size) return;
      const params = new URLSearchParams(searchParams);
      params.set("size", newSize.toString());
      navigate({ search: params.toString() });
    },
    [searchParams, navigate, size]
  );

  const paginationModel = useMemo(
    () =>
      new PaginationModel({
        totalPages: 0,
        totalElements: 0,
        page,
        size,
      }),
    [page, size]
  );

  return {
    page,
    size,
    setPage,
    setSize,
    paginationModel,
  };
};
