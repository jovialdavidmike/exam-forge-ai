import { Play, Lock } from 'lucide-react';

const sampleVideos = [
  { id: 1, title: 'Introduction to Mole Concept', subject: 'Chemistry', duration: '12:34', color: '160 84% 39%' },
  { id: 2, title: 'Solving Quadratic Equations', subject: 'Mathematics', duration: '9:15', color: '210 100% 52%' },
  { id: 3, title: 'Cell Division: Mitosis & Meiosis', subject: 'Biology', duration: '14:02', color: '38 92% 50%' },
  { id: 4, title: 'Comprehension Techniques', subject: 'English', duration: '8:47', color: '280 60% 50%' },
  { id: 5, title: 'Electrolysis Explained', subject: 'Chemistry', duration: '11:20', color: '160 84% 39%' },
  { id: 6, title: 'Algebra: Linear Equations', subject: 'Mathematics', duration: '10:05', color: '210 100% 52%' },
];

export default function VideosPage() {
  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-foreground">Video Lessons 🎬</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Short explainer videos for every topic</p>
      </div>

      {/* Coming Soon Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20 p-5 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.08),transparent_70%)]" />
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-3">
            <Play className="w-7 h-7 text-primary ml-0.5" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">Coming Soon!</h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
            We're preparing bite-sized video lessons to help you master every topic. Stay tuned!
          </p>
          <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            In Development
          </span>
        </div>
      </div>

      {/* Preview Grid */}
      <div>
        <h2 className="text-sm font-bold text-foreground mb-3">Preview what's coming</h2>
        <div className="grid grid-cols-2 gap-3">
          {sampleVideos.map(video => (
            <div
              key={video.id}
              className="group relative bg-card rounded-xl border border-border overflow-hidden opacity-75"
            >
              {/* Thumbnail placeholder */}
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
              {/* Info */}
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
