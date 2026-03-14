import { Play, Lock } from 'lucide-react';

const sampleVideos = [
  { id: 1, title: 'Convert 0.75 to Fraction', subject: 'Mathematics', duration: '3:12', color: '210 100% 52%', youtubeId: 'KbTtqVj9h3o' },
  { id: 2, title: 'Solving Quadratic Equations', subject: 'Mathematics', duration: '9:15', color: '210 100% 52%' },
  { id: 3, title: 'Cell Division: Mitosis & Meiosis', subject: 'Biology', duration: '14:02', color: '38 92% 50%' },
  { id: 4, title: 'Comprehension Techniques', subject: 'English', duration: '8:47', color: '280 60% 50%' },
  { id: 5, title: 'Electrolysis Explained', subject: 'Chemistry', duration: '11:20', color: '160 84% 39%' },
  { id: 6, title: 'Algebra: Linear Equations', subject: 'Mathematics', duration: '10:05', color: '210 100% 52%' },
] as const;

export default function VideosPage() {
  const featured = sampleVideos[0];
  const comingSoon = sampleVideos.slice(1);

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-foreground">Video Lessons 🎬</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Short explainer videos for every topic</p>
      </div>

      {/* Featured Video */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-foreground">🎥 Now Playing</h2>
        <div className="rounded-xl overflow-hidden border border-border bg-card">
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${featured.youtubeId}?si=vVqvPKcGjtAX56oH`}
              title={featured.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="p-3">
            <p className="text-sm font-semibold text-foreground">{featured.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{featured.subject}</p>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div>
        <h2 className="text-sm font-bold text-foreground mb-3">Coming Soon</h2>
        <div className="grid grid-cols-2 gap-3">
          {comingSoon.map(video => (
            <div
              key={video.id}
              className="group relative bg-card rounded-xl border border-border overflow-hidden opacity-75"
            >
              <div
                className="aspect-video w-full flex items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, hsl(${video.color} / 0.15), hsl(${video.color} / 0.05))` }}
              >
                <div className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center border border-border">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="absolute bottom-1.5 right-1.5 text-[10px] font-semibold bg-foreground/70 text-background px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2">{video.title}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{video.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}