import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";
import { useState } from "react";
import { AddCategoryModal } from "./add-category-modal";

const MOCK_JOB_CATEGORIES = [
  {
    id: 1,
    name: "프론트엔드 개발",
  },
  {
    id: 2,
    name: "백엔드 개발",
  },
  {
    id: 3,
    name: "풀스택 개발",
  },
  {
    id: 4,
    name: "데브옵스 엔지니어",
  },
  {
    id: 5,
    name: "데이터 사이언티스트",
  },
  {
    id: 6,
    name: "데이터 엔지니어",
  },
  {
    id: 7,
    name: "모바일 앱 개발",
  },
  {
    id: 8,
    name: "UI/UX 디자이너",
  },
  {
    id: 9,
    name: "시스템 관리자",
  },
  {
    id: 10,
    name: "보안 전문가",
  },
  {
    id: 11,
    name: "네트워크 엔지니어",
  },
  {
    id: 12,
    name: "QA 엔지니어",
  },
];

export function JobCategoryList() {
  const [categories, setCategories] = useState(MOCK_JOB_CATEGORIES);

  const handleAddCategory = (name: string) => {
    const newCategory = {
      id: categories.length + 1,
      name,
    };
    setCategories([...categories, newCategory]);
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
                <TableCell>{category.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      수정
                    </Button>
                    <Button size="sm" variant="destructive">
                      삭제
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
