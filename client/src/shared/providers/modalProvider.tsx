"use client";
import { viewerSelectors } from "@/entities/viewer/models/store/viewerSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { uniqueModal } from "../lib/modalVariables";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const type = useAppSelector(viewerSelectors.selectType);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!type) return null;

  return uniqueModal[type];
};

export default ModalProvider;
