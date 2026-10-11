import Image from 'next/image';

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}

export function ImageWithCaption({
  src,
  alt,
  caption,
  fullWidth = false,
  aspectRatio = '16/9',
}: ImageWithCaptionProps) {
  const aspectClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
  };

  return (
    <figure className={`my-8 ${fullWidth ? '-mx-4 sm:-mx-6 lg:-mx-8' : ''}`}>
      <div
        className={`relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 ${
          aspectClasses[aspectRatio]
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={fullWidth ? '100vw' : '(max-width: 768px) 100vw, 800px'}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
