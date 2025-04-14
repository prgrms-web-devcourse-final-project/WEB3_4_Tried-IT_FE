"use client";

import { dementorApiFetchers } from "@repo/api";
import { toast } from "@repo/ui";
import MDEditor from "@uiw/react-md-editor";
import { ImageIcon, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  maxHeight?: number;
  minHeight?: number;
  visibleDragbar?: boolean;
}

export function MarkdownEditor({
  value,
  onChange,
  height = 200,
  maxHeight,
  minHeight,
  visibleDragbar,
}: MarkdownEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 클립보드 이미지 처리 함수
  const handleImagePaste = async (event: ClipboardEvent) => {
    // 클립보드 데이터 확인
    const items = event.clipboardData?.items;
    if (!items) return;

    // 이미지 데이터 찾기
    let imageFile: File | null = null;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        imageFile = items[i].getAsFile();
        // 다른 기본 붙여넣기 동작 방지
        event.preventDefault();
        break;
      }
    }

    // 이미지가 없으면 종료
    if (!imageFile) return;

    // 로딩 상태 활성화
    setIsUploading(true);

    try {
      // 이미지를 서버에 업로드
      const response = await dementorApiFetchers.files.uploadImages({
        body: {
          images: [imageFile],
        },
      });

      // 업로드 성공 처리
      if (response.isSuccess && response.data.data) {
        const uploadedImage = response.data.data[0];
        const imageMarkdown = `![${uploadedImage.originalFilename || "붙여넣은 이미지"}](${import.meta.env.VITE_API_URL}${uploadedImage.fileUrl})\n`;

        // MDEditor API를 사용할 수 없으므로 현재 값에 추가
        const currentValue = value || "";
        onChange(currentValue + "\n" + imageMarkdown);

        toast.success("이미지 붙여넣기 성공");
      } else {
        toast.error("이미지 업로드 실패", {
          description: "이미지 붙여넣기 중 오류가 발생했습니다.",
        });
      }
    } catch (error) {
      console.error("Error pasting image:", error);
      toast.error("이미지 붙여넣기 실패", {
        description: `이미지 업로드 중 오류가 발생했습니다. ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      });
    } finally {
      // 로딩 상태 비활성화
      setIsUploading(false);
    }
  };

  // 붙여넣기 이벤트 리스너 등록
  useEffect(() => {
    const editorElement = editorRef.current;
    if (editorElement) {
      // 클립보드 이벤트 리스너 등록
      const pasteListener = (event: Event) => {
        const clipboardEvent = event as ClipboardEvent;
        handleImagePaste(clipboardEvent);
      };

      editorElement.addEventListener("paste", pasteListener);

      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        editorElement.removeEventListener("paste", pasteListener);
      };
    }
  }, [value]); // value가 변경될 때마다 효과 재실행 (이미지가 추가되었을 때 참조 유지)

  return (
    <div
      ref={editorRef}
      data-color-mode="light"
      className="relative"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add(
          "ring-2",
          "ring-primary/50",
          "bg-primary/5"
        );
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove(
          "ring-2",
          "ring-primary/50",
          "bg-primary/5"
        );
      }}
      onDrop={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove(
          "ring-2",
          "ring-primary/50",
          "bg-primary/5"
        );

        // 드롭된 파일 처리
        if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

        const files = Array.from(e.dataTransfer.files).filter((file) =>
          file.type.startsWith("image/")
        );

        if (files.length === 0) {
          toast.error("이미지만 업로드할 수 있습니다.");
          return;
        }

        // 로딩 상태 활성화
        setIsUploading(true);

        try {
          const response = await dementorApiFetchers.files.uploadImages({
            body: {
              images: files,
            },
          });

          if (response.isSuccess && response.data.data) {
            const uploadedImages = response.data.data;
            let insertText = "";

            uploadedImages.forEach(
              (img: { originalFilename: string; fileUrl: string }) => {
                insertText += `![${img.originalFilename}](${import.meta.env.VITE_API_URL}${img.fileUrl})\n`;
              }
            );

            // 현재 필드 값에 추가하는 방식으로 변경
            const currentValue = value || "";
            onChange(currentValue + "\n" + insertText);
          } else {
            toast.error("이미지 업로드 실패", {
              description: "이미지 업로드 중 오류가 발생했습니다.",
            });
          }
        } catch (error) {
          console.error("Error uploading images:", error);
          toast.error("이미지 업로드 실패", {
            description: `이미지 업로드 중 오류가 발생했습니다. ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
          });
        } finally {
          // 로딩 상태 비활성화
          setIsUploading(false);
        }
      }}
    >
      <MDEditor
        value={value}
        onChange={(newValue) => onChange(newValue || "")}
        preview="edit"
        height={height}
        maxHeight={maxHeight}
        minHeight={minHeight}
        visibleDragbar={visibleDragbar}
        commands={[
          {
            name: "image",
            keyCommand: "image",
            buttonProps: { "aria-label": "이미지 추가" },
            icon: <ImageIcon className="w-4 h-4" />,
            execute: async (state, api) => {
              const fileInput = document.createElement("input");
              fileInput.type = "file";
              fileInput.accept = "image/*";
              fileInput.multiple = true;

              fileInput.onchange = async (e) => {
                const target = e.target as HTMLInputElement;
                if (!target.files || target.files.length === 0) return;

                // 로딩 상태 활성화
                setIsUploading(true);

                try {
                  const response = await dementorApiFetchers.files.uploadImages(
                    {
                      body: {
                        images: Array.from(target.files),
                      },
                    }
                  );

                  if (response.isSuccess && response.data.data) {
                    const uploadedImages = response.data.data;
                    let insertText = "";

                    uploadedImages.forEach(
                      (img: { originalFilename: string; fileUrl: string }) => {
                        insertText += `![${img.originalFilename}](${import.meta.env.VITE_API_URL}${img.fileUrl})\n`;
                      }
                    );

                    api.replaceSelection(insertText);
                  } else {
                    toast.error("이미지 업로드 실패", {
                      description: "이미지 업로드 중 오류가 발생했습니다.",
                    });
                  }
                } catch (error) {
                  console.error("Error uploading images:", error);
                  toast.error("이미지 업로드 실패", {
                    description: `이미지 업로드 중 오류가 발생했습니다. ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
                  });
                } finally {
                  // 로딩 상태 비활성화
                  setIsUploading(false);
                }
              };

              fileInput.click();
            },
          },
        ]}
      />

      {/* 로딩 인디케이터 */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 z-10">
          <div className="flex flex-col items-center space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm font-medium">이미지 업로드 중...</p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="hidden drag-active:flex items-center justify-center bg-primary/10 border-2 border-dashed border-primary/30 rounded-md p-4">
          <ImageIcon className="w-8 h-8 text-primary/50 mr-2" />
          <span className="text-primary/70 text-lg font-medium">
            이미지를 여기에 드롭하세요
          </span>
        </div>
      </div>
    </div>
  );
}
