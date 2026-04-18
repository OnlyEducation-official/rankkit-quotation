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
};

export default function DownloadPdfAlert({
    onDownloadPdf,
    grandTotal
}: AlertProps) {
    return (
        <div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button type="button" className="gap-2 sm:ml-auto">
                        <Download className="h-4 w-4" />
                        Download PDF
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Save quotation?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Do you want to save this quotation before downloading the PDF?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>No, Close</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDownloadPdf(grandTotal)}>
                            Yes
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}
