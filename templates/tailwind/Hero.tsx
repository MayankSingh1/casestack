import Image from 'next/image';

interface HeroProps {
  title: string;
  outcome: string;
  role: string;
  timeline: string;
  team: string[];
  platforms: string[];
  company?: string;
  heroImage?: string;
  heroAlt?: string;
}

export function Hero({
  title,
  outcome,
  role,
  timeline,
  team,
  platforms,
  company,
  heroImage,
  heroAlt = '',
}: HeroProps) {
  return (
    <header className="relative bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            {company && (
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {company}
              </p>
            )}
            
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            
            <p className="mt-6 text-xl leading-relaxed text-slate-600 dark:text-slate-300">
              {outcome}
            </p>
            
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <div>
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Role
                </dt>
                <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                  {role}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Timeline
                </dt>
                <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                  {timeline}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Team
                </dt>
                <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                  {team.length} people
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Platform
                </dt>
                <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                  {platforms.join(', ')}
                </dd>
              </div>
            </dl>
          </div>
          
          {heroImage && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 lg:aspect-auto lg:h-full">
              <Image
                src={heroImage}
                alt={heroAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
