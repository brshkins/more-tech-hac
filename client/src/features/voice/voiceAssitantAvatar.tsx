import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import React from "react";

const VoiceAssitantAvatar = () => {
  return (
    <Avatar>
      <AvatarFallback className="bg-[#7c0b1cde] text-red-500 text-xs">
        MT
      </AvatarFallback>
    </Avatar>
  );
};

export default VoiceAssitantAvatar;
