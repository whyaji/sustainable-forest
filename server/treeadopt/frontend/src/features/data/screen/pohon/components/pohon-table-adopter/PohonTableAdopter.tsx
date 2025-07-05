import { Link } from '@tanstack/react-router';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';

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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LandCoverLabel } from '@/enum/landCover.enum';
import { TreeCategoryLabel } from '@/enum/treeCategory.enum';
import { addToMyWishtree } from '@/lib/api/wishtreeApi';
import { TreeType } from '@/types/tree.type';

import { TreeDetailTooltip } from '../tree-detail-tooltip/TreeDetailTooltip';

export function PohonTableAdopter({
  data,
  isPending,
  assignMasterTree = false,
}: {
  data?: TreeType[];
  isPending: boolean;
  assignMasterTree?: boolean;
}) {
  if (!data && !isPending) {
    return <div className="text-center">No data available</div>;
  }

  const headers = [
    { label: 'ID', width: 'w-16' },
    { label: 'Kode', width: 'w-32' },
    { label: 'Nama Pohon', width: 'w-64' },
    ...(assignMasterTree
      ? []
      : [
          { label: 'Komunitas', width: 'w-32' },
          { label: 'Deskripsi', width: 'w-80' },
          { label: 'Adopter', width: 'w-40' },
        ]),
    { label: 'Action', width: 'w-78' },
  ];

  return (
    <Table className="table-fixed">
      <TableHeader className="sticky top-0 z-10 bg-background">
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header.label} className={header.width}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending
          ? Array.from({ length: 8 }).map((_, index) => (
              <TableRow key={index}>
                {headers.map((header, subIndex) => (
                  <TableCell key={subIndex} className={header.width}>
                    <Skeleton className="h-5" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : data?.map((tree) => {
              const isNotAdopted =
                tree.adopter === null ||
                (tree.adopter?.endDate ? new Date(tree.adopter.endDate) <= new Date() : true);
              const isTreeAvailable = tree.status === 1 && isNotAdopted;
              return (
                <Tooltip key={tree.id}>
                  <TooltipTrigger asChild>
                    <TableRow key={tree.id}>
                      <TableCell className="w-16">{tree.id}</TableCell>
                      <TableCell className="w-32">{tree.code}</TableCell>
                      <TableCell className="w-64">
                        {tree.masterTree?.latinName && (
                          <div>
                            <strong>Latin:</strong> {tree.masterTree?.latinName}
                          </div>
                        )}
                        <div>
                          <strong>Lokal:</strong>{' '}
                          {(tree.masterLocalTree
                            ?.map((localTree) => localTree.localName)
                            .join(', ') ||
                            tree.localTreeName) ??
                            '-'}
                        </div>
                      </TableCell>
                      {!assignMasterTree && (
                        <>
                          <TableCell className="w-32">{tree.kelompokKomunitas?.name}</TableCell>
                          <TableCell className="w-80">
                            {tree.survey && (
                              <div>
                                <div>
                                  <strong>Kategori:</strong>{' '}
                                  {TreeCategoryLabel[tree.survey.category]}
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
                          <TableCell className="w-40">{tree.adopter?.user?.name ?? '-'}</TableCell>
                        </>
                      )}
                      <TableCell className="w-78">
                        <div className="flex gap-2">
                          <Link to="/data/pohon/$treeId" params={{ treeId: String(tree.id) }}>
                            <Button variant="outline">
                              <Eye className="h-4 w-4" />
                              Detail
                            </Button>
                          </Link>
                        </div>
                        {isTreeAvailable && (
                          <div className="flex flex-row gap-2">
                            <Button variant="outline" className="mt-2">
                              Adopsi Sekarang
                            </Button>
                            <Button
                              variant="outline"
                              className="mt-2"
                              onClick={async (e) => {
                                e.preventDefault();
                                // Add to wishtree logic here
                                // You can call an API or handle the logic as needed
                                console.log(`Add tree ${tree.id} to wishtree`);
                                try {
                                  const result = await addToMyWishtree(tree.id);
                                  if (result.success) {
                                    // Handle success, e.g., show a success message or update UI
                                    console.log('Tree added to wishtree successfully:', result);
                                    toast('Pohon berhasil ditambahkan ke Wishtree');
                                  }
                                } catch {
                                  toast(
                                    'Gagal menambahkan pohon ke Wishtree atau sudah ada di Wishtree'
                                  );
                                }
                              }}>
                              Tambahkan ke Wishtree
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-screen">
                    <TreeDetailTooltip tree={tree} />
                  </TooltipContent>
                </Tooltip>
              );
            })}
      </TableBody>
    </Table>
  );
}
