import { ClassCard } from "@/pages/available-classes/components/class-card";
import { TabsTrigger } from "@/shared/ui/tabs";
import { ComponentProps } from "react";

const mentorings = Array.from(
  { length: 8 },
  (_, index) =>
    ({
      id: index + 1,
      title: `${String.fromCharCode(65 + index)} 멘토의 기가막힌 개발 수업! 수업 제목이 길어지면 어떻게 될까? 이것도 될까? 이것보다도 길어지면?`,
      price: 10000 + index * 1000,
      description: `극강의 개발 수업을 경험해보세요! 최대 10명의 학생이 참여할 수 있습니다. 무지하게 긴 설명을 쓰고 싶다면 이렇게 쓰면 됩니다. 무지하게 긴 설명을 쓰고 싶다면 이렇게 쓰면 됩니다.  무지하게 긴 설명을 쓰고 싶다면 이렇게 쓰면 됩니다.  `,
      mentor: {
        name: `${String.fromCharCode(65 + index)} 멘토`,
        job: "개발자",
        career: 10,
      },
      stack: "React",
      image: `https://placehold.co/400x400?text=${index + 1}`,
    }) as const
);

export function AvailableClasses() {
  const handleCardClick = (id: number) => {
    alert(`${id}번 수업을 선택했습니다.`);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {mentorings.map((mentoring, index) => (
        <ClassCard
          key={index}
          entity={mentoring}
          onClick={() => handleCardClick(mentoring.id)}
        />
      ))}
    </div>
  );
}

export function StyledTabTrigger({
  value,
  children,
  ...props
}: ComponentProps<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      value={value}
      className="px-6 py-3 border-0 border-b-2 rounded-b-none bg-transparent
      data-[state=active]:border-primary dark:data-[state=active]:border-primary 
      data-[state=active]:shadow-none data-[state=active]:drop-shadow-xs data-[state=active]:shadow-primary/50
      dark:data-[state=active]:drop-shadow dark:data-[state=active]:shadow-primary/50
      "
      {...props}
    >
      {children}
    </TabsTrigger>
  );
}
