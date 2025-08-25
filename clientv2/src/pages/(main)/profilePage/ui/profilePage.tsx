import { useCurrentProfile } from "@/entities/profile/hooks/useCurrentProfile";
import { ProfileInfoBadge } from "@/features/profile/ui/profileInfoBadge";
import { ProfileUploadCvBadge } from "@/features/profile/ui/profileUploadCvBadge";
import { EDrawerVariables, ERouteNames } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { IconButton } from "@/shared/ui/button/iconButton";
import { InfoCard } from "@/widgets/infoCard";
import {
  Award,
  ChevronLeft,
  Loader,
  LucideMessageCircleQuestionMark,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  //далее будет запрос на получение профиля и мутация с оптимистичным обновлением
  const { data: currentProfile, isSuccess, isPending } = useCurrentProfile();

  const navigate = useNavigate();
  const { setOpenDrawer } = useActions();

  const handleToDashboard = () => navigate(-1);
  const handleToInterviews = () =>
    navigate(`/${ERouteNames.DASHBOARD_ROUTE}/${ERouteNames.INTERVIEWS_ROUTE}`);

  const handleOpenProfileInfoDrawer = () =>
    setOpenDrawer({ isOpen: true, type: EDrawerVariables.PROFILE_DRAWER });

  const handleOpenProfileCvDrawer = () =>
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.PROFILE_CV_DRAWER,
      data: { onFileChange: () => {} },
    });

  if (!isSuccess || isPending) {
    return (
      <span>
        <Loader className="animate-spin" />
      </span>
    );
  }

  return (
    <div className="text-white flex flex-col space-y-3">
      <div className="flex justify-start items-center">
        <IconButton ariaLabel="вернуться назад" onClick={handleToDashboard}>
          <ChevronLeft className="h-6 w-6" />
        </IconButton>
      </div>

      <div className="space-y-3">
        <ProfileInfoBadge
          currentProfile={currentProfile}
          onClick={handleOpenProfileInfoDrawer}
        />
        <ProfileUploadCvBadge
          profileCv={currentProfile?.cvFile ?? null}
          onClick={handleOpenProfileCvDrawer}
        />
      </div>

      <div className="flex w-full space-x-2 h-[124px]">
        <InfoCard
          icon={
            <LucideMessageCircleQuestionMark className="w-5 h-5 text-gray-300" />
          }
          title={
            <>
              Мои <br /> собеседования
            </>
          }
          onClick={handleToInterviews}
        />
        <InfoCard
          icon={<Award className="w-5 h-5 text-gray-300" />}
          title={
            <>
              Мои <br /> достижения
            </>
          }
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
