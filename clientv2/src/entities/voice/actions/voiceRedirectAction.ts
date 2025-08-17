import { queryClient } from "@/shared/api/queryClient";
import { VACANCY_DETAIL_QUERY } from "../../vacancy/lib/queryKeys";
import { redirect } from "react-router-dom";
import { ERouteNames } from "@/shared";

export const voiceRedirectAction = async () => {
  const selectVacancy = queryClient.getQueryData([VACANCY_DETAIL_QUERY]);

  if (!selectVacancy) {
    return null;
  }

  const loadVoice = async () => {
    //  Добавиться метод createOrGetVoiceByVacancyId
    // Пока что возвращаем моковый id голоса
    return "mocked_voice_id";
  };

  const selectVoiceId = await loadVoice();

  if (!selectVoiceId) {
    return redirect(`/${ERouteNames.DASHBOARD_ROUTE}`);
  }

  return redirect(
    `/${ERouteNames.DASHBOARD_ROUTE}/${ERouteNames.VOICE_ROUTE}/${selectVoiceId}`
  );
};
