"use client";

import { Button } from "@heroui/react";
import { deleteTutor } from "@/actions/actions";
import { useRouter } from "next/navigation";

export default function DeleteBtn({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTutor(id);
    router.push("/tutors"); // delete হলে  যাবে
  };

  return (
    <Button onClick={handleDelete} color="danger">
      Delete
    </Button>
  );
}