import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { ConfirmationDialog } from '@/components/confimation-dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteMasterTree } from '@/lib/api/masterTreeApi';
import { MasterTreeType } from '@/types/masterTree.type';

export function MasterPohonTable({
  data,
  isPending,
}: {
  data?: MasterTreeType[];
  isPending: boolean;
}) {
  const navigate = useNavigate();

  if (!data && !isPending) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <Table>
      <TableHeader className="sticky top-0 z-10 bg-background">
        <TableRow>
          {['ID', 'Latin Name', 'Local Name', 'Action'].map((head) => (
            <TableHead key={head}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending
          ? Array.from({ length: 8 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 9 }).map((_, subIndex) => (
                  <TableHead key={subIndex}>
                    <Skeleton className="h-5" />
                  </TableHead>
                ))}
              </TableRow>
            ))
          : data?.map((masterTree) => (
              <TableRow key={masterTree.id}>
                <TableCell>{masterTree.id}</TableCell>
                <TableCell>{masterTree.latinName}</TableCell>
                <TableCell>
                  {masterTree.masterLocalTree?.map((localTree) => localTree.localName).join(', ')}
                </TableCell>
                <TableCell className="flex flex-row gap-4">
                  <Button
                    variant="outline"
                    className="w-20"
                    onClick={() =>
                      navigate({
                        to: `/master/pohon/update/${masterTree.id}`,
                      })
                    }>
                    Edit
                  </Button>
                  <ConfirmationDialog
                    title="Apakah anda yakin untuk menghapus?"
                    message="Data yang dihapus tidak dapat dikembalikan."
                    confirmText="Delete"
                    onConfirm={async () => {
                      try {
                        await deleteMasterTree(String(masterTree.id));
                        window.location.reload();
                      } catch (error) {
                        console.error(error);
                        toast.error('Failed to delete komunitas');
                      }
                    }}
                    confirmVarriant="destructive"
                    triggerButton={
                      <Button variant="destructive" className="w-20">
                        Delete
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
