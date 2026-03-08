import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookOpen, Lock, Crown } from 'lucide-react';
import { topics, subjects } from '@/data/questions';
import { useAds } from '@/contexts/AdContext';
import BannerAd from '@/components/ads/BannerAd';

export default function TopicsPage() {
  const navigate = useNavigate();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const { isPremium, isTopicUnlocked, setShowUnlockAd, setPendingUnlockTopicId } = useAds();

  const handleTopicClick = (topicId: string, isPremiumTopic?: boolean) => {
    if (isPremiumTopic && !isTopicUnlocked(topicId)) {
      setPendingUnlockTopicId(topicId);
      setShowUnlockAd(true);
      return;
    }
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-foreground">Topics</h1>
        <p className="text-sm text-muted-foreground">Learn concepts before you practice</p>
      </div>

      {subjects.map(sub => {
        const subTopics = topics.filter(t => t.subject === sub.id);
        if (subTopics.length === 0) return null;

        const freeCount = subTopics.filter(t => !t.premium).length;
        const premiumCount = subTopics.filter(t => t.premium).length;

        return (
          <div key={sub.id}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-lg">{sub.icon}</span>
              <h2 className="text-sm font-bold text-foreground">{sub.name}</h2>
              <span className="text-[10px] text-muted-foreground ml-auto">
                {freeCount} free{premiumCount > 0 ? ` · ${premiumCount} premium` : ''}
              </span>
            </div>
            <div className="space-y-2">
              {subTopics.map(topic => {
                const locked = topic.premium && !isTopicUnlocked(topic.id);
                const isExpanded = expandedTopic === topic.id && !locked;
                return (
                  <div key={topic.id} className={`bg-card rounded-xl border overflow-hidden ${locked ? 'border-border/50 opacity-90' : 'border-border'}`}>
                    <button
                      onClick={() => handleTopicClick(topic.id, topic.premium)}
                      className="w-full flex items-center gap-3 p-3.5 text-left"
                    >
                      {locked ? (
                        <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                      <span className={`flex-1 text-sm font-semibold ${locked ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {topic.name}
                      </span>
                      {topic.premium && !locked && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                          Unlocked
                        </span>
                      )}
                      {locked ? (
                        <Crown className="w-4 h-4 text-accent" />
                      ) : isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
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
