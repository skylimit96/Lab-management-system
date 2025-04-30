import React, { useState } from 'react';
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  getSortedRowModel,
  SortingState,
  getPaginationRowModel
} from '@tanstack/react-table';
import { UAV } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { Edit, Trash2, ChevronUp, ChevronDown, Check, X } from 'lucide-react';
import Button from '../ui/Button';

interface UAVTableProps {
  data: UAV[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UAVTable: React.FC<UAVTableProps> = ({ 
  data,
  onEdit,
  onDelete
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const columnHelper = createColumnHelper<UAV>();
  
  const columns = [
    columnHelper.accessor('uavNumber', {
      header: 'UAV Number',
      cell: info => (
        <Link to={`/uavs/${info.row.original.id}`} className="font-medium text-blue-600 hover:text-blue-800">
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('location', {
      header: 'Location',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => <StatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor('arrivalDate', {
      header: 'Arrival Date',
      cell: info => format(parseISO(info.getValue()), 'MMM d, yyyy'),
    }),
    columnHelper.accessor('completionDate', {
      header: 'Completion',
      cell: info => {
        const value = info.getValue();
        if (!value) return <span className="text-gray-500">-</span>;
        return format(parseISO(value), 'MMM d, yyyy');
      },
    }),
    columnHelper.accessor('managerSignature', {
      header: 'Signed',
      cell: info => {
        const value = info.getValue();
        if (!value) return <X className="text-red-500 h-5 w-5" />;
        return <Check className="text-green-500 h-5 w-5" />;
      }
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => (
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(info.row.original.id)}
            className="text-gray-600 hover:text-blue-600"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button 
            onClick={() => onDelete(info.row.original.id)}
            className="text-gray-600 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    }),
  ];
  
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      
                      {header.column.getCanSort() && (
                        <span>
                          {{
                            asc: <ChevronUp className="h-4 w-4" />,
                            desc: <ChevronDown className="h-4 w-4" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <div className="h-4 w-4 text-gray-300">⋮</div>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
        
        <span className="text-sm text-gray-700">
          Page{' '}
          <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> of{' '}
          <span className="font-medium">{table.getPageCount()}</span>
        </span>
      </div>
    </div>
  );
};

export default UAVTable;