"use client";

import { cancelSession } from "@/actions/actions";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteSession({ bookingId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteBtn = async () => {
    setLoading(true);
    try {
      const result = await cancelSession(bookingId);
      if (result.matchedCount > 0) {
         router.push('/my-booked-sessions');
        router.refresh();
      }
    } catch (err) {
      console.error('error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger">Cancel Session</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel Session permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete the session and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onPress={handleDeleteBtn}
                slot="close"
                variant="danger"
                isLoading={loading}
              >
                Cancel Session
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}