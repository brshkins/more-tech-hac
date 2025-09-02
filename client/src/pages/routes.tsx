import RootPage from "./(main)/rootPage";
import ErrorPage from "./(main)/errorPage";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy } from "react";
import AuthPage from "./(auth)/authPage";
import { ERouteNames } from "@/shared";
import { vacancyDetailAction } from "@/entities/vacancy/actions/vacancyDetailAction";
import { voiceRedirectAction } from "@/entities/voice/actions/voiceRedirectAction";
import { voiceDetailAction } from "@/entities/voice/actions/voiceDetailAction";
import { routesWithHoc } from "@/shared/lib/utils/routesWithHoc";
import { privatePage } from "@/entities/viewer/lib/hoc/privatePage";

const DashboardPage = lazy(() => import("@/pages/(main)/dashboardPage"));
const ChatPage = lazy(() => import("@/pages/(main)/voiceAssistantPage"));
const ProfilePage = lazy(() => import("@/pages/(main)/profilePage"));

const AnalyticsPage = lazy(() => import("@/pages/(admin)/analyticsPage"));
const CandidatesPage = lazy(() => import("@/pages/(admin)/candidatesPage"));
const ManagementPage = lazy(() => import("@/pages/(admin)/managementPage"));

const VacancyPage = lazy(() => import("@/pages/(main)/vacancyPage"));
const ResultPage = lazy(() => import("@/pages/(main)/resultPage"));
const InterviewsPage = lazy(() => import("@/pages/(main)/interviewsPage"));

const RegisterPage = lazy(() => import("@/pages/(auth)/registerPage"));
const LoginPage = lazy(() => import("@/pages/(auth)/loginPage"));

export const routes = createBrowserRouter([
  {
    path: ERouteNames.DEFAULT_ROUTE,
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ERouteNames.EMPTY_ROUTE,
        element: <Outlet />,
        children: [
          ...routesWithHoc(privatePage, [
            {
              path: ERouteNames.EMPTY_ROUTE,
              element: <Navigate to={ERouteNames.DASHBOARD_ROUTE} replace />,
            },
            {
              path: ERouteNames.DASHBOARD_ROUTE,
              element: <Outlet />,
              children: [
                {
                  path: ERouteNames.EMPTY_ROUTE,
                  element: <DashboardPage />,
                },
                {
                  path: ERouteNames.VACANCY_DETAIL_ROUTE,
                  element: (
                    <Navigate to={ERouteNames.DASHBOARD_ROUTE} replace />
                  ),
                },
                {
                  path: ERouteNames.VACANCY_ROUTE,
                  loader: vacancyDetailAction,
                  element: <VacancyPage />,
                },
                {
                  path: ERouteNames.VOICE_ROUTE,
                  loader: voiceRedirectAction,
                },
                {
                  path: ERouteNames.VOICE_DETAIL_ROUTE,
                  loader: voiceDetailAction,
                  element: <Outlet />,
                  children: [
                    {
                      path: ERouteNames.EMPTY_ROUTE,
                      element: <ChatPage />,
                    },
                    {
                      path: ERouteNames.RESULT_ROUTE,
                      //повесить экшен который будет проверять что по такому id войса есть результаты если нет отправлять обратно
                      element: <ResultPage />,
                    },
                  ],
                },
                {
                  path: ERouteNames.PROFILE_ROUTE,
                  element: <Outlet />,
                  children: [
                    {
                      path: ERouteNames.EMPTY_ROUTE,
                      element: <ProfilePage />,
                    },
                  ],
                },
                {
                  path: ERouteNames.INTERVIEWS_ROUTE,
                  element: <InterviewsPage />,
                },
              ],
            },
            {
              path: ERouteNames.DASHBOARD_ADMIN_ROUTE,
              element: <Outlet />,
              children: [
                {
                  path: ERouteNames.EMPTY_ROUTE,
                  element: <AnalyticsPage />,
                },
                {
                  path: ERouteNames.CANDIDATES_ROUTE,
                  element: <CandidatesPage />,
                },
                {
                  path: ERouteNames.MANAGEMENT_ROUTE,
                  element: <ManagementPage />,
                },
              ],
            },
          ]),
        ],
      },
      {
        path: ERouteNames.AUTH_ROUTE,
        element: <AuthPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ERouteNames.EMPTY_ROUTE,
            element: <Navigate to={ERouteNames.REGISTER_ROUTE} replace />,
          },
          {
            path: ERouteNames.REGISTER_ROUTE,
            element: <RegisterPage />,
          },
          {
            path: ERouteNames.LOGIN_ROUTE,
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
