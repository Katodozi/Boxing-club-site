"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MembershipCategory } from "@/lib/types";
import JoinModal from "./JoinModal";

interface JoinModalContextValue {
  isOpen: boolean;
  category: MembershipCategory;
  openModal: (category?: MembershipCategory) => void;
  closeModal: () => void;
}

const JoinModalContext = createContext<JoinModalContextValue | null>(null);

export function useJoinModal() {
  const ctx = useContext(JoinModalContext);
  if (!ctx) {
    throw new Error("useJoinModal must be used within a JoinModalProvider");
  }
  return ctx;
}

export default function JoinModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<MembershipCategory>("drop-in");

  function openModal(cat: MembershipCategory = "drop-in") {
    setCategory(cat);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <JoinModalContext.Provider value={{ isOpen, category, openModal, closeModal }}>
      {children}
      <JoinModal />
    </JoinModalContext.Provider>
  );
}
