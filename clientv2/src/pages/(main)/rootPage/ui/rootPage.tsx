import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <div className="h-screen py-5 px-4 md:px-8 relative">
        <main className="w-full h-full py-3">
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
};

export default RootPage;
