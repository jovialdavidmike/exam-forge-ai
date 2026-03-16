import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { subjects } from '@/data/questions';
import { getSubjectAccuracy } from '@/data/store';
import BannerAd from '@/components/ads/BannerAd';

const deptConfig: Record<string, { name: string; subjectIds: string[] }> = {
  science: {
    name: 'Science',
    subjectIds: ['mathematics', 'physics', 'chemistry', 'biology'],
  },
  arts: {
    name: 'Arts & Social Sciences',
    subjectIds: ['english', 'government', 'literature', 'economics', 'civic', 'commerce'],
  },
};

export default function SubjectsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const deptId = searchParams.get('dept') || 'science';
  const dept = deptConfig[deptId] || deptConfig.science;
  const deptSubjects = subjects.filter(s => dept.subjectIds.includes(s.id));

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/departments')} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-foreground">{dept.name}</h1>
          <p className="text-sm text-muted-foreground">Choose a subject to practice</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {deptSubjects.map(sub => {
          const acc = getSubjectAccuracy(sub.id);
          return (
            <button
              key={sub.id}
              onClick={() => navigate(`/practice?subject=${sub.id}`)}
              className="w-full bg-card rounded-xl p-3.5 border border-border flex items-center gap-3 hover:bg-muted transition-colors text-left"
            >
              <span className="text-2xl">{sub.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">{sub.name}</p>
                <p className="text-xs text-muted-foreground">
                  {acc.attempted > 0 ? `${acc.percentage}% accuracy · ${acc.attempted} answered` : 'Not started'}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          );
        })}
      </div>

      <BannerAd />
    </div>
  );
}
