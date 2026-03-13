import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, FlaskConical, Leaf, BookOpen, Mail, Sparkles, Target } from 'lucide-react';

const subjects = [
  { name: 'Physics', icon: Atom },
  { name: 'Chemistry', icon: FlaskConical },
  { name: 'Biology', icon: Leaf },
  { name: 'English', icon: BookOpen },
];

export default function AboutPage() {
  return (
    <div className="px-4 pt-6 pb-8 space-y-6">
      <h1 className="text-2xl font-extrabold text-foreground">About ExamForge</h1>

      {/* Introduction */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            What is ExamForge?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            ExamForge is an interactive online study platform designed to help students prepare for WAEC, NECO, and JAMB examinations. The platform provides structured study notes, practice quizzes, and AI-generated questions to help students understand concepts and test their knowledge.
          </p>
        </CardContent>
      </Card>

      {/* Author */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">About the Author</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Jovial David Mike</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            ExamForge was created by Jovial David Mike with the goal of helping students learn through practice, quizzes, and simplified study materials.
          </p>
        </CardContent>
      </Card>

      {/* Subjects Covered */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Subjects Covered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {subjects.map(sub => (
              <div key={sub.name} className="flex items-center gap-2 bg-muted rounded-lg p-3">
                <sub.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{sub.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mission */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our mission is to make exam preparation simple, interactive, and accessible for students everywhere.
          </p>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <a href="mailto:support@examforge.com" className="text-sm text-primary hover:underline">
            support@examforge.com
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
