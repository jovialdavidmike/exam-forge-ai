import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Trash2 } from 'lucide-react';
import { questions as allQuestions } from '@/data/questions';
import { getBookmarks, removeBookmark } from '@/data/store';

export default function BookmarksPage() {
  const navigate = useNavigate();
  const [bookmarkIds, setBookmarkIds] = useState(getBookmarks());

  const bookmarked = allQuestions.filter(q => bookmarkIds.includes(q.id));

  const handleRemove = (id: string) => {
    removeBookmark(id);
    setBookmarkIds(getBookmarks());
  };

  return (
    <div className="px-4 pt-4 pb-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-extrabold text-foreground">🔖 Bookmarks</h1>
          <p className="text-xs text-muted-foreground">{bookmarked.length} saved questions</p>
        </div>
      </div>

      {bookmarked.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No bookmarked questions yet.</p>
          <p className="text-xs text-muted-foreground mt-1">Tap the bookmark icon during practice to save difficult questions.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarked.map(q => (
            <div key={q.id} className="bg-card rounded-xl border border-border p-3.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-primary font-semibold mb-1">{q.topic} · {q.difficulty}</p>
                  <p className="text-sm font-medium text-foreground leading-relaxed">{q.question}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Answer: <span className="font-semibold text-success">{q.options[q.correctIndex]}</span>
                  </p>
                </div>
                <button onClick={() => handleRemove(q.id)} className="text-muted-foreground hover:text-destructive p-1 flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
