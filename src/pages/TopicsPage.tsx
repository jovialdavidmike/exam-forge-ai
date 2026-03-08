import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookOpen } from 'lucide-react';
import { topics, subjects } from '@/data/questions';
import BannerAd from '@/components/ads/BannerAd';

export default function TopicsPage() {
  const navigate = useNavigate();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-foreground">Topics</h1>
        <p className="text-sm text-muted-foreground">Learn concepts before you practice</p>
      </div>

      {subjects.map(sub => {
        const subTopics = topics.filter(t => t.subject === sub.id);
        if (subTopics.length === 0) return null;
        return (
          <div key={sub.id}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-lg">{sub.icon}</span>
              <h2 className="text-sm font-bold text-foreground">{sub.name}</h2>
            </div>
            <div className="space-y-2">
              {subTopics.map(topic => {
                const isExpanded = expandedTopic === topic.id;
                return (
                  <div key={topic.id} className="bg-card rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                      className="w-full flex items-center gap-3 p-3.5 text-left"
                    >
                      <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="flex-1 text-sm font-semibold text-foreground">{topic.name}</span>
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 space-y-3">
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-xs text-foreground whitespace-pre-line leading-relaxed">{topic.notes}</p>
                        </div>
                        {topic.examples.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Examples</p>
                            {topic.examples.map((ex, i) => (
                              <div key={i} className="bg-primary/5 rounded-lg p-2.5 mb-1.5">
                                <p className="text-xs text-foreground font-mono">{ex}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => navigate(`/practice?subject=${sub.id}`)}
                          className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-xs font-semibold"
                        >
                          Practice {topic.name}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {/* Ad Banner */}
      <BannerAd />
    </div>
  );
}
