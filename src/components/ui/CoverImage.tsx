import Image from "next/image";

import { AbstractCover } from "@/components/ui/AbstractCover";
import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface CoverImageProps {
  /** Path from frontmatter. May be missing or point at a file that does not exist. */
  src?: string;
  alt: string;
  /** Seed for the generated fallback artwork. */
  seed: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders the entry image when the file is actually present in /public, and a
 * generated abstract cover otherwise. Either way the layout stays identical.
 */
export function CoverImage({
  src,
  alt,
  seed,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  className,
}: CoverImageProps) {
  const resolved = resolvePublicAsset(src);

  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {resolved ? (
        <Image
          src={resolved}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <AbstractCover seed={seed} />
      )}
    </div>
  );
}
