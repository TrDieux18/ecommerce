"use client";

import React, { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
   isOpen: boolean;
   onCloseAction: () => void;
   onConfirmAction: () => void;
   loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
   isOpen,
   onCloseAction,
   onConfirmAction,
   loading
}) => {
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, [])

   if (!isMounted) {
      return null;
   }

   return <>
      <Modal
         title="Are you sure?"
         description="This action cannot be undone."
         isOpen={isOpen}
         onClose={onCloseAction}
      >
         <div
            className="
            pt-6 space-x-2 flex items-center justify-end w-full 
            "
         >
            <Button
               disabled={loading}
               variant="outline"
               onClick={onCloseAction}
            >
               Cancel
            </Button>
            <Button
               disabled={loading}
               variant="destructive"
               onClick={onConfirmAction}
            >
               Confirm
            </Button>
         </div>
      </Modal></>
}