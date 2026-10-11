import Image from 'next/image';

interface BeforeAfterProps {
  before: {
    src: string;
    alt: string;
    label?: string;
  };
  after: {
    src: string;
    alt: string;
    label?: string;
  };
  caption?: string;
}

export function BeforeAfter({ before, after, caption }: BeforeAfterProps) {
  return (
    <figure className="my-8">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="relative">
          <div className="absolute left-3 top-3 z-10 rounded-full bg-slate-900/80 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            {before.label || 'Before'}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
            <Image
              src={before.src}
              alt={before.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute left-3 top-3 z-10 rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white">
            {after.label || 'After'}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
            <Image
              src={after.src}
              alt={after.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
      
      {caption && (
        <figcaption className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
