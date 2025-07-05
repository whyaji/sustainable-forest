import { useQuery } from '@tanstack/react-query';
import { Heart, MapPin, Trash2, TreePine } from 'lucide-react';
import { useState } from 'react';

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
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { usePaginationFilter } from '@/hooks/use-pagination-filter';
import { getMyWishtrees } from '@/lib/api/wishtreeApi';

export function WishtreeScreen() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { paginationParams } = usePaginationFilter({
    limit: 99999,
    withData: 'treeId',
  });
  // Mock the useQuery hook for demonstration
  const { data, isPending } = useQuery({
    queryKey: ['get-my-wishtree'],
    queryFn: () => getMyWishtrees(paginationParams),
  });

  const dataWishtree = data?.data ?? [];

  const deleteWishtree = (treeIds) => {
    console.log('Delete Wishtree with IDs:', treeIds);
    // Remove deleted items from selection
    setSelectedItems([]);
    setIsDeleteDialogOpen(false);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(dataWishtree.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, itemId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 1:
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        );
      case 2:
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case 0:
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getLandCoverText = (landCover) => {
    const landCoverMap = {
      1: 'Forest',
      2: 'Plantation',
      3: 'Grassland',
      4: 'Urban',
    };
    return landCoverMap[landCover] || 'Unknown';
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your wish trees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Heart className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wish Trees</h1>
            <p className="text-gray-600">Manage your collection of favorite trees</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {dataWishtree.length} {dataWishtree.length === 1 ? 'Tree' : 'Trees'}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <TreePine className="h-5 w-5 text-green-600" />
                <span>Wish Tree Collection</span>
              </CardTitle>
              <CardDescription>Select and manage your favorite trees</CardDescription>
            </div>
            {selectedItems.length > 0 && (
              <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="flex items-center space-x-2">
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Selected ({selectedItems.length})</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently remove{' '}
                      {selectedItems.length} tree{selectedItems.length > 1 ? 's' : ''} from your
                      wish list.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteWishtree(selectedItems)}
                      className="bg-red-600 hover:bg-red-700">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {dataWishtree.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No wish trees yet</h3>
              <p className="text-gray-600">
                Start adding trees to your wish list to see them here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50 rounded-lg font-medium text-sm text-gray-700">
                <div className="flex items-center">
                  <Checkbox
                    checked={selectedItems.length === dataWishtree.length}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </div>
                <div>Tree Information</div>
                <div>Code</div>
                <div>Status</div>
                <div>Location</div>
                <div>Land Cover</div>
                <div>Added Date</div>
                <div className="text-right">Actions</div>
              </div>

              {/* Table Body */}
              <div className="space-y-2">
                {dataWishtree.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-8 gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectItem(item.id, checked)}
                        aria-label={`Select ${item.tree?.localTreeName}`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <TreePine className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {item.tree?.localTreeName || 'Unknown Tree'}
                          </div>
                          <div className="text-sm text-gray-500">Tree ID: {item.treeId}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <code className="px-2 py-1 bg-gray-100 rounded text-sm">
                        {item.tree?.code || 'N/A'}
                      </code>
                    </div>
                    <div>{getStatusBadge(item.tree?.status)}</div>
                    <div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {item.tree?.latitude?.toFixed(4)}, {item.tree?.longitude?.toFixed(4)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Elevation: {item.tree?.elevation}m
                      </div>
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs">
                        {getLandCoverText(item.tree?.landCover)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">{formatDate(item.createdAt)}</div>
                    <div className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove from Wish List</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove "{item.tree?.localTreeName}" from your
                              wish list?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteWishtree([item.id])}
                              className="bg-red-600 hover:bg-red-700">
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedItems.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-medium text-blue-900">
                  {selectedItems.length} tree{selectedItems.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedItems([])}
                  className="text-blue-700 border-blue-300 hover:bg-blue-100">
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
