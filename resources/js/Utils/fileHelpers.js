export const getFileTypeIcon = (fileType) => {
    // Document types
    if (fileType.includes('pdf')) return 'pi pi-file-pdf';
    if (fileType.includes('word') || fileType.includes('doc')) return 'pi pi-file-word';
    if (fileType.includes('powerpoint') || fileType.includes('ppt')) return 'pi pi-file-export';
    if (fileType.includes('excel') || fileType.includes('xlsx')) return 'pi pi-file-excel';
    if (fileType.includes('text')) return 'pi pi-file-edit';
    
    // Archive types
    if (fileType.includes('zip') || fileType.includes('rar')) return 'pi pi-file-archive';
    
    // Default
    return 'pi pi-file';
};

export const getFileTypeColor = (fileType) => {
    // Document types colors
    if (fileType.includes('pdf')) return 'text-red-500';
    if (fileType.includes('word') || fileType.includes('doc')) return 'text-blue-500';
    if (fileType.includes('powerpoint') || fileType.includes('ppt')) return 'text-orange-500';
    if (fileType.includes('excel') || fileType.includes('xlsx')) return 'text-green-500';
    if (fileType.includes('text')) return 'text-gray-500';
    
    // Archive types
    if (fileType.includes('zip') || fileType.includes('rar')) return 'text-yellow-500';
    
    // Default
    return 'text-gray-400';
};
