import { mdxComponents } from "@/components/mdx/components";
import { compileMdx } from "@/lib/mdx";
import { cn } from "@/lib/utils";

interface MDXContentProps {
  source: string;
  className?: string;
}

/**
 * Compiles and renders an MDX body. Every caller is statically generated, so
 * compilation happens once during the build.
 */
export async function MDXContent({ source, className }: MDXContentProps) {
  if (!source.trim()) return null;

  const { Content } = await compileMdx(source);

  return (
    <div className={cn("prose prose-sm sm:prose-base", className)}>
      <Content components={mdxComponents} />
    </div>
  );
}
