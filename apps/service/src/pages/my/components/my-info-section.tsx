import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Skeleton,
  Typography,
} from "@repo/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

const userInfoSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름은 2자 이상이어야 합니다." })
    .max(10, { message: "이름은 20자 이하여야 합니다." }),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  phone: z.string().regex(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, {
    message: "올바른 전화번호 형식이 아닙니다.",
  }),
});

type UserInfoFormData = z.infer<typeof userInfoSchema>;

export interface MyInfoSectionProps {
  onChangeUserInfo: (userInfo: Partial<UserInfoFormData>) => void;
}

export function MyInfoSection({ onChangeUserInfo }: MyInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user } = useGetUserInfo();

  const form = useForm<UserInfoFormData>({
    defaultValues: {
      name: user?.nickname,
      email: user?.email,
      phone: "010-1234-5678", // TODO: API에서 전화번호 정보를 받아올 때 수정
    },
    resolver: zodResolver(userInfoSchema),
    mode: "onChange",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = (data: UserInfoFormData) => {
    onChangeUserInfo(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.reset({
      name: user?.nickname,
      email: user?.email,
      phone: "010-1234-5678", // TODO: API에서 전화번호 정보를 받아올 때 수정
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Typography.H2>내 정보</Typography.H2>
        {!isEditing ? (
          <Button onClick={handleEdit}>편집하기</Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button onClick={form.handleSubmit(handleConfirm)}>확인</Button>
          </div>
        )}
      </div>
      <Card>
        <CardContent className="md:pt-6 ">
          <Form {...form}>
            <form className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly disabled />
                    </FormControl>
                    <FormMessage />
                    {isEditing && (
                      <Typography.Small className="text-muted-foreground/50 pl-2">
                        이메일은 현재 변경 불가능합니다.
                      </Typography.Small>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly disabled />
                    </FormControl>
                    <FormMessage />
                    {isEditing && (
                      <Typography.Small className="text-muted-foreground/50 pl-2">
                        전화번호는 현재 변경 불가능합니다.
                      </Typography.Small>
                    )}
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>가입일</FormLabel>
                <FormControl>
                  <Input
                    value={user?.createdAt.fullDateTime}
                    readOnly
                    disabled
                  />
                </FormControl>
              </FormItem>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

MyInfoSection.Skeleton = MyInfoSectionSkeleton;

function MyInfoSectionSkeleton() {
  const form = useForm();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Typography.H2>내 정보</Typography.H2>
      </div>
      <Card>
        <CardContent className="md:pt-6 ">
          <Form {...form}>
            <form className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-6">
              <FormField
                name="name"
                render={() => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Skeleton className="bg-primary/10">
                      <FormControl />
                      <Input />
                    </Skeleton>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                render={() => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Skeleton className="bg-primary/10">
                      <FormControl />
                      <Input />
                    </Skeleton>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                render={() => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <Skeleton className="bg-primary/10">
                      <FormControl />
                      <Input />
                    </Skeleton>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>가입일</FormLabel>
                <Skeleton className="bg-primary/10">
                  <FormControl />
                  <Input />
                </Skeleton>
              </FormItem>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
