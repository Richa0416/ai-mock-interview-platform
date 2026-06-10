import { Link } from 'react-router-dom';
import { Mic } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ROUTES } from '../utils/constants';

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <Card>
        <h1 className="text-3xl font-bold text-white mb-4">
          AI Mock Interview Dashboard
        </h1>

        <p className="text-slate-400 mb-6">
          Welcome to your AI-powered interview preparation platform.
        </p>

        <Link to={ROUTES.SETUP}>
          <Button icon={Mic} size="lg">
            Start Mock Interview
          </Button>
        </Link>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <h2 className="text-xl text-white font-semibold">
            Interviews Completed
          </h2>
          <p className="text-cyan-400 text-3xl mt-2">12</p>
        </Card>

        <Card>
          <h2 className="text-xl text-white font-semibold">
            Average Score
          </h2>
          <p className="text-violet-400 text-3xl mt-2">85%</p>
        </Card>

        <Card>
          <h2 className="text-xl text-white font-semibold">
            Practice Streak
          </h2>
          <p className="text-amber-400 text-3xl mt-2">7 Days</p>
        </Card>
      </div>
    </div>
  );
}