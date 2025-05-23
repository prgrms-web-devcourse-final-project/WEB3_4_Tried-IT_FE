"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useGetJobCategories } from "@/features/job/hooks/use-get-job-categories";
import { MarkdownEditor } from "@/widgets/markdown-editor";
import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography,
} from "@repo/ui";

const formSchema = z.object({
  name: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
  position: z.string({ required_error: "직무를 선택해주세요." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  phoneNumber: z
    .string()
    .regex(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, {
      message: "유효한 핸드폰 번호를 입력해주세요.",
    }),
  experience: z.number(),
  company: z.string().min(1, { message: "현재 기업을 입력해주세요." }),
  introduction: z
    .string()
    .min(10, { message: "자기소개는 10글자 이상이어야 합니다." }),
  attachments: z.array(z.instanceof(File)),
});

export type MentorApplicationFormValues = z.infer<typeof formSchema>;

interface MentorApplicationFormProps {
  onSubmit: (values: MentorApplicationFormValues) => void;
}

const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_SIZE_MB = 5;

export function MentorApplicationForm({
  onSubmit,
}: MentorApplicationFormProps) {
  const { data: jobCategories } = useGetJobCategories();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
      phoneNumber: "",
      experience: 1,
      company: "",
      introduction: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    if (files.length > MAX_ATTACHMENTS) {
      alert(`최대 ${MAX_ATTACHMENTS}개의 파일만 업로드할 수 있습니다.`);
      return;
    }

    if (
      [...files].some(
        (file) => file.size > MAX_ATTACHMENT_SIZE_MB * 1024 * 1024
      )
    ) {
      alert(`최대 ${MAX_ATTACHMENT_SIZE_MB}MB의 파일만 업로드할 수 있습니다.`);
      return;
    }

    form.setValue("attachments", [...files]);
  };

  return (
    <div className="container max-w-3xl mx-auto py-10 md:px-4">
      <Card className="border-none shadow-md">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>직무</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="직무를 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jobCategories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>연락받을 이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      멘티와의 연락에 사용될 이메일입니다.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>연락처</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="010-1234-5678"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      멘티와의 연락에 사용될 핸드폰 번호입니다.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>경력</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            onChange={(e) => {
                              field.onChange(Number(e.target.value));
                            }}
                          />
                        </FormControl>
                        <Typography.Small className="text-muted-foreground shrink-0">
                          년차
                        </Typography.Small>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>현재 기업</FormLabel>
                      <FormControl>
                        <Input placeholder="현재 근무 중인 회사" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormLabel htmlFor="certificate">경력증명서</FormLabel>
                <div className="mt-1">
                  <FormField
                    control={form.control}
                    name="attachments"
                    render={({ field }) => (
                      <label
                        htmlFor="certificate"
                        className="flex items-center gap-2 border border-input rounded-md p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <Upload className="h-5 w-5" />
                        <span>
                          {field.value
                            ?.map((attachment) => attachment.name)
                            .join(", ") ?? "파일을 선택해주세요."}
                        </span>
                        <input
                          id="certificate"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          multiple
                        />
                      </label>
                    )}
                  />

                  <p className="text-sm text-muted-foreground mt-1">
                    PDF, Word, 이미지 파일을 업로드해주세요. (최대{" "}
                    {MAX_ATTACHMENT_SIZE_MB}MB, 최대 {MAX_ATTACHMENTS}개)
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="introduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>나를 소개하는 글</FormLabel>
                    <FormDescription>
                      제목(#), 링크, 이미지 등의 마크다운 문법을 사용할 수
                      있습니다. 이미지는 드래그앤드롭으로도 추가할 수 있습니다.
                    </FormDescription>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value}
                        onChange={field.onChange}
                        height={200}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" size="lg" className="px-8">
                  제출하기
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
