import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type AlertProps = {
  onDownloadPdf: (grandTotal: number) => void | Promise<void>;
  grandTotal:number;
  mode:string;
};

export default function DownloadPdfAlert({
    onDownloadPdf,
    grandTotal,
    mode
}: AlertProps) {
    return (
        <div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button type="button" className="gap-2 sm:ml-auto w-full">
                        <Download className="h-4 w-4" />
                        {mode === "edit" ? "Download & Edit" : "Download"}
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {
                                mode === "edit" ?
                                    "Edit Quotation" :
                                    "Save quotation?"
                            }
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Do you want to <b>{mode === "edit" ? "Edit" : " Save"}</b> this quotation before downloading the PDF?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>No, Close</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDownloadPdf(grandTotal)}>
                            {mode === "edit" ? "Yes, Edit" : "Yes, Save"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}
