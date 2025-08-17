import { LoaderFunctionArgs } from "react-router-dom";

export const voiceDetailAction = async ({
  params: { voiceId },
}: LoaderFunctionArgs) => {
  // Здесь будет получение истории голоса и подгрузка сообщений по voiceId
  console.log(voiceId);

  return null;
};
