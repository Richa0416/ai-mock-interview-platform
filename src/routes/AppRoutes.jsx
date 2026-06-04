import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import PageLoader from '../components/ui/PageLoader';
import { ROUTES } from '../utils/constants';
import { getToken } from '../utils/storage';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const InterviewSetupPage = lazy(() => import('../pages/InterviewSetupPage'));
const InterviewSessionPage = lazy(() => import('../pages/InterviewSessionPage'));
const ResultsPage = lazy(() => import('../pages/ResultsPage'));
const InterviewHistoryPage = lazy(() => import('../pages/InterviewHistoryPage'));

function ProtectedRoute({ children }) {
  const token = getToken();
  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const token = getToken();
  if (token) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader message="Loading page..." />}>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

        <Route
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.SETUP} element={<InterviewSetupPage />} />
          <Route path={ROUTES.SESSION} element={<InterviewSessionPage />} />
          <Route path={ROUTES.RESULTS} element={<ResultsPage />} />
          <Route path={ROUTES.HISTORY} element={<InterviewHistoryPage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  );
}
