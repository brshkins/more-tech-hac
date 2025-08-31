import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useViewer } from "../../model/context/providers";
import { getAccessToken } from "@/entities/token";
import { ERouteNames } from "@/shared";
import { Image } from "@/shared/ui";

export const privatePage = (children: React.ReactNode) => {
  return <PrivatePage>{children}</PrivatePage>;
};

const PrivatePage: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loginViewer } = useViewer();
  const pathname = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      loginViewer(token);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      navigate(`/${ERouteNames.AUTH_ROUTE}/${ERouteNames.LOGIN_ROUTE}`);
    }
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Image
          alt="logo-suspese"
          src="/images/logo.jpg"
          className="w-6 h-6 rounded-sm animate-ping"
        />
      </div>
    );
  }

  return isAuthenticated ? children : null;
};
