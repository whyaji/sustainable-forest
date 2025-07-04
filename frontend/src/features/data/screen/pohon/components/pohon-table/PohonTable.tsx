import { useNavigate } from '@tanstack/react-router';
import { Eye, FileText, Pen, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { ConfirmationDialog } from '@/components/confimation-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LandCoverLabel } from '@/enum/landCover.enum';
import { TreeCategoryLabel } from '@/enum/treeCategory.enum';
import { deleteTree } from '@/lib/api/treeApi';
import { TreeType } from '@/types/tree.type';

import { DialogFormLocalTreeName } from '../dialog-form-local-tree-name/DialogFormLocalTreeName';

export function PohonTable({
  data,
  isPending,
  assignMasterTree = false,
  refetch,
}: {
  data?: TreeType[];
  isPending: boolean;
  assignMasterTree?: boolean;
  refetch?: () => void;
}) {
  const navigate = useNavigate();

  if (!data && !isPending) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <Table>
      <TableHeader className="sticky top-0 z-10 bg-background">
        <TableRow>
          {[
            'ID',
            'Kode',
            'Nama Pohon',
            !assignMasterTree ? 'Komunitas' : null,
            !assignMasterTree ? 'Deskripsi' : null,
            !assignMasterTree ? 'Adopter' : null,
            'Action',
          ]
            .filter((value) => value !== null)
            .map((head) => (
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
          : data?.map((tree) => (
              <TableRow key={tree.id}>
                <TableCell>{tree.id}</TableCell>
                <TableCell>{tree.code}</TableCell>
                <TableCell>
                  {tree.masterTree?.latinName && (
                    <div>
                      <strong>Latin:</strong> {tree.masterTree?.latinName}
                    </div>
                  )}
                  <div>
                    <strong>Lokal:</strong>{' '}
                    {(tree.masterLocalTree?.map((localTree) => localTree.localName).join(', ') ||
                      tree.localTreeName) ??
                      '-'}
                  </div>
                </TableCell>
                {!assignMasterTree && (
                  <>
                    <TableCell>{tree.kelompokKomunitas?.name}</TableCell>
                    <TableCell>
                      {tree.survey && (
                        <div>
                          <div>
                            <strong>Kategori:</strong> {TreeCategoryLabel[tree.survey.category]}
                          </div>
                          <div>
                            <strong>Circumference:</strong> {tree.survey.circumference} cm
                          </div>
                          <div>
                            <strong>Serapan Karbon (CO2):</strong> {tree.survey.serapanCo2} kg
                          </div>
                        </div>
                      )}
                      <div>
                        <strong>Jenis Tanah:</strong> {LandCoverLabel[tree.landCover]}
                      </div>
                    </TableCell>
                    <TableCell>{tree.adopter?.user?.name ?? '-'}</TableCell>
                  </>
                )}
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate({
                          to: `/data/pohon/${tree.id}`,
                        })
                      }>
                      <Eye className="h-4 w-4" />
                      Detail
                    </Button>
                    {assignMasterTree ? (
                      <Dialog key="edit-local-name">
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Pen className="h-4 w-4" />
                            Edit Nama Lokal
                          </Button>
                        </DialogTrigger>
                        <DialogFormLocalTreeName tree={tree} refetch={refetch} />
                      </Dialog>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          disabled={tree.surveyorId === null}
                          onClick={() =>
                            navigate({
                              to: `/data/pohon/${tree.id}/survey-history`,
                            })
                          }>
                          <FileText className="h-4 w-4" />
                          Survey
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            navigate({
                              to: `/data/pohon/${tree.id}/update`,
                            })
                          }>
                          <Pen className="h-4 w-4" />
                          Edit
                        </Button>
                        <ConfirmationDialog
                          title="Apakah anda yakin untuk menghapus?"
                          message="Data yang dihapus tidak dapat dikembalikan."
                          confirmText="Delete"
                          onConfirm={async () => {
                            try {
                              await deleteTree(String(tree.id));
                              refetch?.();
                            } catch (error) {
                              console.error(error);
                              toast.error('Failed to delete komunitas');
                            }
                          }}
                          confirmVarriant="destructive"
                          triggerButton={
                            <Button variant="destructive">
                              <Trash className="h-4 w-4" />
                              Delete
                            </Button>
                          }
                        />
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
