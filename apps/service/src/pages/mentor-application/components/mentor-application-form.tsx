"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { Typography } from "@/shared/ui/typography";

const formSchema = z.object({
  name: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
  position: z.string({ required_error: "직무를 선택해주세요." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  experience: z.number(),
  company: z.string().min(1, { message: "현재 기업을 입력해주세요." }),
  githubLink: z
    .string()
    .url({ message: "유효한 URL을 입력해주세요." })
    .optional()
    .or(z.literal("")),
  introduction: z
    .string()
    .min(10, { message: "자기소개는 10글자 이상이어야 합니다." }),
  targetAudience: z
    .string()
    .min(10, { message: "대상 설명은 10글자 이상이어야 합니다." }),
  attachments: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
});

interface MentorApplicationFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_SIZE_MB = 5;

export function MentorApplicationForm({
  onSubmit,
}: MentorApplicationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
      experience: 1,
      company: "",
      githubLink: "",
      introduction: "",
      targetAudience: "",
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

    console.log([...files]);

    if (
      [...files].some(
        (file) => file.size > MAX_ATTACHMENT_SIZE_MB * 1024 * 1024
      )
    ) {
      alert(`최대 ${MAX_ATTACHMENT_SIZE_MB}MB의 파일만 업로드할 수 있습니다.`);
      return;
    }

    // TODO: 파일 업로드 API 호출 후 업로드 된 파일의 ID를 받아오는 로직 추가
    const uploadedFiles = [...files].map((file, index) => ({
      id: index.toString(),
      name: file.name,
    }));

    form.setValue("attachments", uploadedFiles);
  };

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <Card className="border-none shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center">
            멘토 지원하기
          </CardTitle>
          <CardDescription className="text-center pt-2">
            멘토링을 제공하고 싶으신 분들은 아래 양식을 작성해주세요.
            <br />
            관리자의 승인이 완료되면 멘토 활동을 시작할 수 있습니다.
          </CardDescription>
        </CardHeader>
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
                          <SelectItem value="frontend">
                            프론트엔드 개발자
                          </SelectItem>
                          <SelectItem value="backend">백엔드 개발자</SelectItem>
                          <SelectItem value="fullstack">
                            풀스택 개발자
                          </SelectItem>
                          <SelectItem value="mobile">모바일 개발자</SelectItem>
                          <SelectItem value="devops">
                            DevOps 엔지니어
                          </SelectItem>
                          <SelectItem value="designer">
                            UI/UX 디자이너
                          </SelectItem>
                          <SelectItem value="pm">프로덕트 매니저</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
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

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>경력</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input type="number" min="0" {...field} />
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

              <FormField
                control={form.control}
                name="githubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>깃허브 링크</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      선택 사항입니다. 포트폴리오나 프로젝트를 공유하고 싶다면
                      입력해주세요.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormControl>
                      <Textarea
                        placeholder="자신의 경험, 전문 분야, 멘토링 스타일 등을 소개해주세요."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이런 분들에게 좋아요</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="어떤 멘티들에게 도움을 줄 수 있는지 설명해주세요."
                        className="min-h-[120px]"
                        {...field}
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
