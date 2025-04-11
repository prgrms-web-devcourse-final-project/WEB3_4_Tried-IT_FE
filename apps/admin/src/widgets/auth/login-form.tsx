import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CustomPasswordInput,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  username: z.string().nonempty({
    message: "아이디를 입력해주세요.",
  }),
  password: z.string().nonempty({
    message: "비밀번호를 입력해주세요.",
  }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const handleSubmit = (data: LoginFormData) => {
    onSubmit(data.username, data.password);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>아이디</FormLabel>
                <FormControl>
                  <Input {...field} />
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
        </div>
      </form>
    </Form>
  );
}
