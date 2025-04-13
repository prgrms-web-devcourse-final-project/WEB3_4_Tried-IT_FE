"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DayOfWeekConst } from "@repo/api";
import {
  Button,
  ButtonWithLoading,
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
  Textarea,
} from "@repo/ui";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  content: z.string().min(1, { message: "내용을 입력해주세요." }),
  price: z.number().min(1000, { message: "가격을 입력해주세요." }),
  stacks: z.string().refine(
    (value) => {
      const values = value.split(",").map((v) => v.trim());
      return values.length > 0;
    },
    {
      message: "기술스택 정보들을 입력해주세요.",
    }
  ),
  schedule: z.array(
    z.object({
      dayOfWeek: z.enum([
        DayOfWeekConst.MONDAY,
        DayOfWeekConst.TUESDAY,
        DayOfWeekConst.WEDNESDAY,
        DayOfWeekConst.THURSDAY,
        DayOfWeekConst.FRIDAY,
        DayOfWeekConst.SATURDAY,
        DayOfWeekConst.SUNDAY,
      ]),
      time: z.string().refine(
        (time) => {
          const [hours, minutes] = time.split(":");
          return !isNaN(Number(hours)) && !isNaN(Number(minutes));
        },
        {
          message: "시간 형식이 올바르지 않습니다.",
        }
      ),
    })
  ),
});

export type MentorClassCreateFormValues = z.infer<typeof formSchema>;

interface MentorClassCreateFormProps {
  onSubmit: (values: MentorClassCreateFormValues) => Promise<void>;
}

export function MentorClassCreateForm({
  onSubmit,
}: MentorClassCreateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      price: 0,
      stacks: "",
      schedule: [],
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    await onSubmit(values);
  }

  useEffect(() => {
    console.log("submitting", form.formState.isSubmitting);
  }, [form.formState.isSubmitting]);

  const handleAddSchedule = () => {
    const currentSchedules = form.getValues("schedule");
    const daysOfWeek = [
      DayOfWeekConst.MONDAY,
      DayOfWeekConst.TUESDAY,
      DayOfWeekConst.WEDNESDAY,
      DayOfWeekConst.THURSDAY,
      DayOfWeekConst.FRIDAY,
      DayOfWeekConst.SATURDAY,
      DayOfWeekConst.SUNDAY,
    ];

    const availableSlots = daysOfWeek.map((day) => {
      const availableTimes = timeOptions.filter(
        (option) =>
          !currentSchedules.some(
            (schedule) =>
              schedule.dayOfWeek === day && schedule.time === option.value
          )
      );
      return {
        day,
        availableTimes,
      };
    });

    const firstAvailableSlot = availableSlots.find(
      (slot) => slot.availableTimes.length > 0
    );

    if (!firstAvailableSlot) {
      alert("더 이상 추가할 수 있는 시간대가 없습니다.");
      return;
    }

    form.setValue("schedule", [
      ...currentSchedules,
      {
        dayOfWeek: firstAvailableSlot.day,
        time: firstAvailableSlot.availableTimes[0].value,
      },
    ]);
  };

  const handleRemoveSchedule = (index: number) => {
    const currentSchedules = form.getValues("schedule");
    form.setValue(
      "schedule",
      currentSchedules.filter((_, i) => i !== index)
    );
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return {
      value: `${hour}:00`,
      label: `${hour}:00 ~ ${(i + 1).toString().padStart(2, "0")}:00`,
    };
  });

  const isTimeSlotTaken = (
    dateOfWeek: string,
    time: string,
    currentIndex: number
  ) => {
    const schedules = form.getValues("schedule");
    return schedules.some(
      (schedule, index) =>
        index !== currentIndex &&
        schedule.dayOfWeek === dateOfWeek &&
        schedule.time === time
    );
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
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="멘토링 수업 제목을 입력해주세요"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내용</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="멘토링 수업에 대한 상세 설명을 입력해주세요"
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>가격</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1000}
                        placeholder="수업 가격을 입력해주세요"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stacks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>기술 스택</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="기술 스택을 입력해주세요 (쉼표로 구분)"
                        {...field}
                        onBlur={(e) => {
                          const values = e.target.value
                            .split(",")
                            .map((v) => v.trim())
                            .join(",");

                          field.onChange(values);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      쉼표(,)로 구분하여 여러 기술 스택을 입력할 수 있습니다.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>수업 일정</FormLabel>
                <div className="space-y-4">
                  {form.watch("schedule").map((schedule, index) => (
                    <div key={index} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`schedule.${index}.dayOfWeek`}
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  form.setValue(
                                    `schedule.${index}.time`,
                                    "00:00"
                                  );
                                }}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="요일을 선택해주세요" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={DayOfWeekConst.MONDAY}>
                                    월요일
                                  </SelectItem>
                                  <SelectItem value={DayOfWeekConst.TUESDAY}>
                                    화요일
                                  </SelectItem>
                                  <SelectItem value={DayOfWeekConst.WEDNESDAY}>
                                    수요일
                                  </SelectItem>
                                  <SelectItem value={DayOfWeekConst.THURSDAY}>
                                    목요일
                                  </SelectItem>
                                  <SelectItem value={DayOfWeekConst.FRIDAY}>
                                    금요일
                                  </SelectItem>
                                  <SelectItem value={DayOfWeekConst.SATURDAY}>
                                    토요일
                                  </SelectItem>
                                  <SelectItem value={DayOfWeekConst.SUNDAY}>
                                    일요일
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`schedule.${index}.time`}
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="시간을 선택해주세요" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeOptions.map((option) => {
                                    const isDisabled = isTimeSlotTaken(
                                      form.getValues(
                                        `schedule.${index}.dayOfWeek`
                                      ),
                                      option.value,
                                      index
                                    );
                                    return (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        disabled={isDisabled}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleRemoveSchedule(index)}
                      >
                        삭제
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddSchedule}
                  >
                    일정 추가
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <ButtonWithLoading
                  type="submit"
                  size="lg"
                  className="px-8"
                  loading={form.formState.isSubmitting}
                  disabled={form.formState.isSubmitting}
                >
                  제출하기
                </ButtonWithLoading>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
