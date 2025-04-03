import { ClassListItemModel } from "@/entities/model/class/class-list-item.model";
import { AspectRatio, Badge, Card, CardContent } from "@repo/ui";
import { cn } from "@repo/utils/cn";

export interface ClassCardProps {
  model: ClassListItemModel;
  onClick?: () => void;
}

export function ClassCard({ model, onClick }: ClassCardProps) {
  const { image, title, description, mentor, stack, price } = model;
  return (
    <Card
      className={cn(
        "overflow-hidden border-0 rounded-lg shadow-black/20 dark:shadow-white/20 shadow hover:shadow-md hover:-translate-y-1 transition-all duration-300 py-0",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative  flex items-center justify-center overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              width={400}
              height={225}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-bold text-base line-clamp-2 h-12">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1 mb-2 line-clamp-2 h-10">
            {description}
          </p>
          <p className="text-sm font-medium">{mentor.name}</p>

          <div>
            <div className="font-bold text-lg">₩{price.toLocaleString()}</div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline">{stack}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
