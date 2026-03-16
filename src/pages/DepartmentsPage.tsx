import { useNavigate } from 'react-router-dom';
import { ChevronRight, FlaskConical, BookOpen } from 'lucide-react';
import { subjects } from '@/data/questions';
import { getSubjectAccuracy } from '@/data/store';

const departments = [
  {
    id: 'science',
    name: 'Science',
    icon: <FlaskConical className="w-6 h-6" />,
    description: 'Mathematics, Physics, Chemistry, Biology',
    subjectIds: ['mathematics', 'physics', 'chemistry', 'biology'],
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    id: 'arts',
    name: 'Arts & Social Sciences',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'English, Government, Literature, Economics, Civic, Commerce',
    subjectIds: ['english', 'government', 'literature', 'economics', 'civic', 'commerce'],
    gradient: 'from-accent/20 to-accent/5',
  },
];

export default function DepartmentsPage() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-foreground">Choose Department</h1>
        <p className="text-sm text-muted-foreground">Select your department to see relevant subjects</p>
      </div>

      <div className="space-y-4">
        {departments.map(dept => {
          const deptSubjects = subjects.filter(s => dept.subjectIds.includes(s.id));
          const totalAnswered = deptSubjects.reduce((sum, s) => sum + getSubjectAccuracy(s.id).attempted, 0);

          return (
            <button
              key={dept.id}
              onClick={() => navigate(`/subjects?dept=${dept.id}`)}
              className={`w-full bg-gradient-to-br ${dept.gradient} rounded-2xl p-5 border border-border text-left transition-all hover:scale-[1.01] active:scale-[0.99]`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary flex-shrink-0">
                  {dept.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-foreground">{dept.name}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{dept.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    {deptSubjects.length} subjects · {totalAnswered} questions answered
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
