import { Button } from "@/shared/ui/button";
import { CustomPasswordInput } from "@/shared/ui/custom-password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { ROUTE_PATH } from "@app/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "이메일 형식이 올바르지 않습니다.",
  }),
  password: z
    .string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(16, {
      message: "비밀번호는 16자 이하여야 합니다.",
    })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
    }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const handleSubmit = (data: LoginFormData) => {
    onSubmit(data.email, data.password);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <CustomPasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <Button variant="gradient" className="w-full" type="submit">
            로그인
          </Button>
          <Button className="w-full" variant="outline" type="button" asChild>
            <Link to={ROUTE_PATH.AUTH.SIGNUP}>회원가입</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
