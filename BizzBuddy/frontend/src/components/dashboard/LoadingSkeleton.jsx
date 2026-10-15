export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-24 rounded-2xl bg-white/5"></div>
        ))}
      </div>
      <div className="h-40 bg-white/5 rounded-2xl mt-6"></div>
      <div className="h-40 bg-white/5 rounded-2xl mt-4"></div>
    </div>
  );
}
