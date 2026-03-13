import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Megaphone } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
}

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    supabase
      .from('announcements')
      .select('id, title, message, date')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setAnnouncement(data[0]);
      });
  }, []);

  if (!announcement) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-xl p-3.5">
      <div className="flex items-start gap-2.5">
        <span className="text-lg mt-0.5">📢</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-foreground">{announcement.title}</p>
            {announcement.date && (
              <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                {announcement.date}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{announcement.message}</p>
        </div>
      </div>
    </div>
  );
}
