import { JobCategoryModel } from "@/entities/job/job-category.model";
import { useDeleteJobCategories } from "@/pages/job-category/hooks/use-delete-job-categories";
import { useGetJobCategories } from "@/pages/job-category/hooks/use-get-job-categories";
import { usePostJobCategories } from "@/pages/job-category/hooks/use-post-job-categories";
import { usePutJobCategories } from "@/pages/job-category/hooks/use-put-job-categories";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@repo/ui";
import { useState } from "react";
import { AddCategoryModal } from "./add-category-modal";
import { EditCategoryModal } from "./edit-category-modal";

export function JobCategoryList() {
  const { data: categories } = useGetJobCategories();
  const { mutateAsync: postJobCategory } = usePostJobCategories();
  const { mutateAsync: putJobCategory } = usePutJobCategories();
  const { mutateAsync: deleteJobCategory } = useDeleteJobCategories();
  const [editingCategory, setEditingCategory] =
    useState<JobCategoryModel | null>(null);
  const [deletingCategory, setDeletingCategory] =
    useState<JobCategoryModel | null>(null);

  const handleAddCategory = async (label: string) => {
    try {
      await postJobCategory(label);
      toast.success("카테고리 추가에 성공했습니다.");
    } catch (error) {
      toast.error("카테고리 추가에 실패했습니다.", {
        description:
          error instanceof Error ? error.message : JSON.stringify(error),
      });
    }
  };

  const handleEditCategory = (category: JobCategoryModel) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = async (label: string) => {
    if (editingCategory) {
      try {
        await putJobCategory({
          id: editingCategory.id,
          label,
        });
        toast.success("카테고리 수정에 성공했습니다.");
        setEditingCategory(null);
      } catch (error) {
        toast.error("카테고리 수정에 실패했습니다.", {
          description:
            error instanceof Error ? error.message : JSON.stringify(error),
        });
      }
    }
  };

  const handleDeleteCategory = (category: JobCategoryModel) => {
    setDeletingCategory(category);
  };

  const handleConfirmDelete = async () => {
    if (deletingCategory) {
      try {
        await deleteJobCategory(Number(deletingCategory.id));
        toast.success("카테고리 삭제에 성공했습니다.");
      } catch (error) {
        toast.error("카테고리 삭제에 실패했습니다.", {
          description:
            error instanceof Error ? error.message : JSON.stringify(error),
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddCategoryModal onAdd={handleAddCategory} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>카테고리명</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.label}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditCategory(category)}
                    >
                      수정
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      삭제
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onUpdate={handleUpdateCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}
      {deletingCategory && (
        <AlertDialog open onOpenChange={() => setDeletingCategory(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>카테고리 삭제</AlertDialogTitle>
              <AlertDialogDescription>
                정말로 "{deletingCategory.label}" 카테고리를 삭제하시겠습니까?
                이 작업은 되돌릴 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
