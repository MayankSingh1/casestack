import Image from 'next/image';
import Link from 'next/link';

interface NextProjectProps {
  title: string;
  slug: string;
  thumbnail?: string;
  description?: string;
}

export function NextProject({ title, slug, thumbnail, description }: NextProjectProps) {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Next Project
        </p>
        
        <Link
          href={`/work/${slug}`}
          className="group mt-8 block overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl dark:bg-slate-800"
        >
          <div className="grid lg:grid-cols-2">
            {thumbnail && (
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-700 lg:aspect-auto lg:h-full">
                <Image
                  src={thumbnail}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-3xl">
                {title}
              </h3>
              
              {description && (
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                  {description}
                </p>
              )}
              
              <div className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <span className="font-medium">View project</span>
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
