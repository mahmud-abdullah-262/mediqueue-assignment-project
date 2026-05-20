"use client";

import { Button } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import { deleteTutor } from "@/actions/actions";
import { useRouter } from "next/navigation";

export default function DeleteBtn({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTutor(id);
    router.push("/tutors");
  };

  return (
    <Button
      onPress={handleDelete}
      variant="outline"
      className="border border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 transition-colors"
    >
      <TrashBin size={15} />
      Delete
    </Button>
  );
}