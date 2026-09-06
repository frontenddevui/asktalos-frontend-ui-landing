import { Skeleton } from "@/components/ui/skeleton";

/* Shared navbar shell reused by all page skeletons */
function NavbarSkeleton() {
  return (
    <div>
      {/* Announcement bar strip */}
      <div className="h-9 bg-gradient-to-r from-orange-400/70 to-amber-400/70" />
      {/* Navbar */}
      <div className="h-16 border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        <Skeleton className="h-8 w-28 rounded-lg" />
        <div className="hidden sm:flex items-center gap-6">
          <Skeleton className="h-4 w-14 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-14 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PageSkeleton  (kept as generic fallback)
────────────────────────────────────────────────────────────────────────────── */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      <div className="max-w-3xl mx-auto text-center px-6 pt-16 pb-12">
        <Skeleton className="h-5 w-28 rounded-full mx-auto mb-5" />
        <Skeleton className="h-11 w-5/6 rounded-lg mx-auto mb-3" />
        <Skeleton className="h-11 w-3/5 rounded-lg mx-auto mb-5" />
        <Skeleton className="h-5 w-2/3 rounded mx-auto mb-2" />
        <Skeleton className="h-5 w-1/2 rounded mx-auto mb-8" />
        <div className="flex gap-3 justify-center">
          <Skeleton className="h-11 w-36 rounded-xl" />
          <Skeleton className="h-11 w-32 rounded-xl" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <Skeleton className="h-64 sm:h-80 w-full rounded-2xl" />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100">
              <Skeleton className="h-8 w-16 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ProductPageSkeleton
   Landing page, Chatbot, Voice Agent, CRM, Email Solution, WhatsApp
   Layout: navbar → two-column hero (text + phone) → 3 feature cards
────────────────────────────────────────────────────────────────────────────── */
export function ProductPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      {/* Hero: two columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: text */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-40 rounded-full" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-4/5 rounded-lg" />
          <Skeleton className="h-10 w-3/5 rounded-lg" />
          <Skeleton className="h-4 w-full rounded mt-1" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
          <div className="flex gap-3 mt-2">
            <Skeleton className="h-11 w-36 rounded-xl" />
            <Skeleton className="h-11 w-32 rounded-xl" />
          </div>
          {/* Stats row */}
          <div className="flex gap-6 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <Skeleton className="h-7 w-16 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            ))}
          </div>
        </div>
        {/* Right: phone mockup */}
        <div className="flex justify-center">
          <Skeleton className="h-[480px] w-[240px] rounded-[40px]" />
        </div>
      </div>
      {/* Feature cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16">
        <Skeleton className="h-7 w-48 rounded mx-auto mb-2" />
        <Skeleton className="h-4 w-64 rounded mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-5 rounded-2xl border border-gray-100 flex flex-col gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-3/5 rounded" />
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-4/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PricingSkeleton
   Layout: navbar → two columns
     Left: heading + image + contact info 2×2 grid
     Right: form (name×2, email, phone+select, company, textarea, submit)
────────────────────────────────────────────────────────────────────────────── */
export function PricingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: heading + image + contact info */}
          <div className="flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 pr-0 lg:pr-6">
            {/* Heading */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-9 w-56 rounded-lg" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
            {/* Image */}
            <div className="flex justify-center">
              <Skeleton className="h-44 w-2/3 rounded-2xl" />
            </div>
            {/* Contact info 2×2 */}
            <div className="border-t border-gray-200 pt-4">
              <Skeleton className="h-6 w-40 rounded mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5 rounded flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-4 w-16 rounded" />
                      <Skeleton className="h-3.5 w-32 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right: form */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <Skeleton className="h-3.5 w-20 rounded" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-28 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            {/* Phone with country code select */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-28 rounded" />
              <div className="flex gap-0">
                <Skeleton className="h-10 w-24 rounded-l-lg rounded-r-none" />
                <Skeleton className="h-10 flex-1 rounded-r-lg rounded-l-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-28 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-20 rounded" />
              <Skeleton className="h-28 w-full rounded-lg" />
            </div>
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BlogListSkeleton
   Layout: navbar → center hero → flex card grid
────────────────────────────────────────────────────────────────────────────── */
export function BlogListSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-8 text-center">
        <Skeleton className="h-5 w-24 rounded-full mx-auto mb-4" />
        <Skeleton className="h-10 w-80 rounded-lg mx-auto mb-3" />
        <Skeleton className="h-4 w-64 rounded mx-auto" />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 flex flex-wrap justify-center gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
            <Skeleton className="w-full" style={{ aspectRatio: '9/10' }} />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-4/5 rounded" />
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-3/4 rounded" />
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BlogPostSkeleton
   Layout: navbar → wide hero (category + title + meta) → article text
────────────────────────────────────────────────────────────────────────────── */
export function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-36 pb-10 text-center">
        <Skeleton className="h-5 w-20 rounded-full mx-auto mb-5" />
        <Skeleton className="h-9 w-full rounded-lg mx-auto mb-3" />
        <Skeleton className="h-9 w-5/6 rounded-lg mx-auto mb-3" />
        <Skeleton className="h-9 w-3/4 rounded-lg mx-auto mb-6" />
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10">
        <Skeleton className="w-full h-56 sm:h-72 rounded-2xl" />
      </div>
      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 flex flex-col gap-3">
        {[100, 90, 95, 80, 0, 100, 88, 75, 92, 0, 96, 85, 70].map((w, i) =>
          w === 0
            ? <div key={i} className="h-4" />
            : <Skeleton key={i} className={`h-4 rounded`} style={{ width: `${w}%` }} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   AboutSkeleton
   Layout: navbar → dark card hero (2 cols: text + image) → stats → team grid
────────────────────────────────────────────────────────────────────────────── */
export function AboutSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      {/* Dark hero card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="rounded-2xl sm:rounded-3xl bg-gray-800/90 px-6 py-6 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-36 rounded-full bg-white/20" />
              <Skeleton className="h-9 w-full rounded-lg bg-white/20" />
              <Skeleton className="h-9 w-4/5 rounded-lg bg-white/20" />
              <Skeleton className="h-4 w-full rounded bg-white/10" />
              <Skeleton className="h-4 w-5/6 rounded bg-white/10" />
              <Skeleton className="h-11 w-44 rounded-xl bg-orange-400/60 mt-2" />
            </div>
            {/* Right: image */}
            <div className="flex justify-center lg:justify-end">
              <Skeleton className="h-48 w-48 rounded-xl bg-white/10" />
            </div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-100">
              <Skeleton className="h-8 w-20 rounded" />
              <Skeleton className="h-3 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
      {/* Team grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <Skeleton className="h-7 w-40 rounded mx-auto mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CareerSkeleton
   Layout: navbar → dark card hero (2 cols: text + image) → job listing rows
────────────────────────────────────────────────────────────────────────────── */
export function CareerSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      {/* Dark hero card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="rounded-2xl sm:rounded-3xl bg-gray-800/90 px-6 py-6 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-40 rounded-full bg-white/20" />
              <Skeleton className="h-9 w-full rounded-lg bg-white/20" />
              <Skeleton className="h-9 w-4/5 rounded-lg bg-white/20" />
              <Skeleton className="h-4 w-full rounded bg-white/10" />
              <Skeleton className="h-4 w-5/6 rounded bg-white/10" />
              <Skeleton className="h-11 w-52 rounded-xl bg-orange-400/60 mt-2" />
            </div>
            {/* Right: image */}
            <div className="flex justify-center lg:justify-end">
              <Skeleton className="h-48 w-48 rounded-xl bg-white/10" />
            </div>
          </div>
        </div>
      </div>
      {/* Job listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 flex flex-col gap-4">
        <Skeleton className="h-6 w-44 rounded mb-2" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-gray-100">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-56 rounded" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-24 rounded-full" />
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            </div>
            <Skeleton className="h-9 w-28 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ContactSkeleton
   Layout: navbar → two columns
     Left: heading + image + contact info 2×2 grid
     Right: form (name×2, email, phone+select, textarea, submit)
────────────────────────────────────────────────────────────────────────────── */
export function ContactSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: heading + image + contact info */}
          <div className="flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 pr-0 lg:pr-6">
            {/* Heading */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-9 w-56 rounded-lg" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
            {/* Image */}
            <div className="flex justify-center">
              <Skeleton className="h-44 w-2/3 rounded-2xl" />
            </div>
            {/* Contact info 2×2 */}
            <div className="border-t border-gray-200 pt-4">
              <Skeleton className="h-6 w-40 rounded mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5 rounded flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-4 w-16 rounded" />
                      <Skeleton className="h-3.5 w-32 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right: form */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <Skeleton className="h-3.5 w-20 rounded" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
            </div>
            {["Email Address", "Company"].map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-28 rounded" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
            {/* Phone with country code select */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-28 rounded" />
              <div className="flex gap-0">
                <Skeleton className="h-10 w-24 rounded-l-lg rounded-r-none" />
                <Skeleton className="h-10 flex-1 rounded-r-lg rounded-l-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-20 rounded" />
              <Skeleton className="h-28 w-full rounded-lg" />
            </div>
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   LegalSkeleton
   Layout: navbar → heading → long text content (privacy, terms, cookies, etc.)
────────────────────────────────────────────────────────────────────────────── */
export function LegalSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <Skeleton className="h-9 w-56 rounded-lg mb-2" />
        <Skeleton className="h-4 w-40 rounded mb-10" />
        {/* Sections */}
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="mb-8">
            <Skeleton className="h-6 w-48 rounded mb-4" />
            {[100, 95, 90, 85, 70].map((w, i) => (
              <Skeleton key={i} className="h-4 rounded mb-2" style={{ width: `${w}%` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   JobApplicationSkeleton
   Layout: navbar → two columns (job details + application form)
────────────────────────────────────────────────────────────────────────────── */
export function JobApplicationSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job details */}
          <div className="lg:col-span-1 border-r border-gray-100 pr-6 flex flex-col gap-4">
            <Skeleton className="h-7 w-48 rounded-lg" />
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-4 w-28 rounded" />
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
              <Skeleton className="h-4 w-32 rounded" />
              {[100, 95, 88, 80].map((w, i) => (
                <Skeleton key={i} className="h-3.5 rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
          {/* Form */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Skeleton className="h-6 w-44 rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <Skeleton className="h-3.5 w-24 rounded" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-28 rounded" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
            <Skeleton className="h-24 w-full rounded-lg border-2 border-dashed border-gray-200" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   IndustrySkeleton
   Layout: navbar → two-column hero → stats → 3 use-case cards
────────────────────────────────────────────────────────────────────────────── */
export function IndustrySkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-36 rounded-full" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-4/5 rounded-lg" />
          <Skeleton className="h-4 w-full rounded mt-1" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <div className="flex gap-3 mt-2">
            <Skeleton className="h-11 w-36 rounded-xl" />
            <Skeleton className="h-11 w-32 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100">
              <Skeleton className="h-7 w-16 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>
      {/* Use-case cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 rounded-2xl border border-gray-100 flex flex-col gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-5 w-3/4 rounded" />
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-4/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HelpFAQSkeleton
   Layout: navbar → search hero → card grid (Help Center) or accordion (FAQ)
────────────────────────────────────────────────────────────────────────────── */
export function HelpFAQSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-10 text-center">
        <Skeleton className="h-10 w-72 rounded-lg mx-auto mb-4" />
        <Skeleton className="h-4 w-64 rounded mx-auto mb-8" />
        <Skeleton className="h-12 w-full max-w-lg mx-auto rounded-xl" />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 rounded-2xl border border-gray-100 flex flex-col gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-5 w-3/4 rounded" />
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-4/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TestimonialsSkeleton
   Layout: navbar → hero → testimonial card grid
────────────────────────────────────────────────────────────────────────────── */
export function TestimonialsSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSkeleton />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-10 text-center">
        <Skeleton className="h-5 w-28 rounded-full mx-auto mb-4" />
        <Skeleton className="h-10 w-80 rounded-lg mx-auto mb-3" />
        <Skeleton className="h-4 w-64 rounded mx-auto" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 rounded-2xl border border-gray-100 flex flex-col gap-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => <Skeleton key={s} className="h-4 w-4 rounded" />)}
            </div>
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-100">
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-3 w-36 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────────
   DemoModalSkeleton
   Shown while the DemoRequestModal lazy chunk is downloading.
   Mirrors the modal's backdrop + left-panel + right-panel layout.
────────────────────────────────────────────────────────────────────────────── */
export function DemoModalSkeleton() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal shell */}
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col md:flex-row max-h-[82vh] md:max-h-[90vh]">

        {/* Left panel — image + branding (md+) */}
        <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center gap-4 p-6 border-r border-gray-100 bg-orange-50/40">
          <Skeleton className="w-full h-52 rounded-2xl" />
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
          <div className="flex flex-col gap-2 w-full mt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full flex-shrink-0" />
                <Skeleton className="h-3.5 flex-1 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto">
          {/* Header row */}
          <div className="flex items-start justify-between mb-1">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-44 rounded-lg" />
              <Skeleton className="h-4 w-56 rounded" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          </div>

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-20 rounded" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            ))}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-24 rounded" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>

          {/* Industry + Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-20 rounded" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            ))}
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-24 rounded" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-28 rounded" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>

          {/* Submit */}
          <Skeleton className="h-10 w-full rounded-lg mt-1" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BelowFoldSkeleton
   Shown while the LandingPage below-fold lazy sections are downloading.
   Shows placeholder blocks that fill the approximate scroll area.
────────────────────────────────────────────────────────────────────────────── */
export function BelowFoldSkeleton() {
  return (
    <div className="w-full">
      {/* Section 1 — platform image */}
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-56 sm:h-72 w-full rounded-2xl" />
        </div>
      </div>

      {/* Section 2 — stats row */}
      <div className="px-4 sm:px-6 lg:px-12 py-10 border-y border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[120px]">
              <Skeleton className="h-9 w-20 rounded-lg" />
              <Skeleton className="h-3.5 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 — feature cards */}
      <div className="px-4 sm:px-6 lg:px-12 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 flex flex-col items-center gap-3">
            <Skeleton className="h-5 w-28 rounded-full" />
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-5 rounded-2xl border border-gray-100 flex flex-col gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
