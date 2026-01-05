import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // If there's only 1 page, don't show pagination
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center space-x-4 mt-12">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Previous Page"
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>

            <span className="text-zinc-400 font-medium">
                Page {currentPage} of {totalPages}
            </span>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Next Page"
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
}
