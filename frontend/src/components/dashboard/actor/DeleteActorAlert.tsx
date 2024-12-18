import React, {useState} from 'react';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import useActor from "@/hooks/actor/useActor";
import {deleteActor} from "@/services/actor/deleteActor";

interface DeleteActorAlertProps {
    id: string;
}

const DeleteActorAlert = ({id}: DeleteActorAlertProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);
    const {removeActorFromState} = useActor();

    const handleDelete = async () => {
        try {
            setError(null);
            setLoading(true);
            await deleteActor(id);
            removeActorFromState(id);
            setLoading(false);
            setIsOpen(false);

        } catch (error) {
            console.log(error);
            setError("An issue occurred while deleting the actor");
        }
    }

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <AlertDialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the actor data and remove it from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                    >
                        {
                            loading ? "Deleting..." : (
                                "Confirm"
                            )
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
                <div>
                    {
                        error && <p className="text-red-500 text-sm mt-2">{error}</p>
                    }
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteActorAlert;