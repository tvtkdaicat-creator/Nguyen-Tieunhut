import * as React from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  AlertCircle, 
  ArrowUpDown,
  Filter,
  DollarSign,
  FileUp,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { mockMaterials } from '@/lib/mock-data';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';

export function Inventory() {
  const [materials, setMaterials] = React.useState(mockMaterials);
  const [isUploading, setIsUploading] = React.useState(false);

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    for (const file of acceptedFiles) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      
      if (extension === 'xlsx' || extension === 'xls') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log('Excel Data:', jsonData);
          // Here you would normally update state or send to backend
          alert(`Đã đọc ${jsonData.length} dòng từ file Excel: ${file.name}`);
        };
        reader.readAsArrayBuffer(file);
      } else if (extension === 'docx' || extension === 'doc') {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const result = await mammoth.extractRawText({ arrayBuffer });
          console.log('Word Content:', result.value);
          alert(`Đã đọc nội dung từ file Word: ${file.name}`);
        };
        reader.readAsArrayBuffer(file);
      } else if (extension === 'dwg') {
        alert(`Nhận diện file AutoCAD: ${file.name}. Tính năng xem bản vẽ đang được khởi tạo...`);
      }
    }
    setIsUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'image/vnd.dwg': ['.dwg'],
      'application/acad': ['.dwg'],
      'application/x-acad': ['.dwg'],
      'application/autocad_dwg': ['.dwg'],
      'image/x-dwg': ['.dwg']
    }
  } as any);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vật tư & Dự toán</h2>
          <p className="text-muted-foreground">Theo dõi vật liệu, nhập file dự toán (Excel/Word) và bản vẽ (DWG).</p>
        </div>
        <div className="flex gap-2">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button variant="outline" className={isDragActive ? "border-primary bg-primary/5" : ""}>
              <FileUp className="mr-2 h-4 w-4" /> 
              {isUploading ? "Đang xử lý..." : "Nhập file (DWG/Excel/Word)"}
            </Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Thêm vật tư
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-500">Tổng mặt hàng</p>
                <h3 className="text-2xl font-bold">1,240</h3>
              </div>
              <Package className="h-8 w-8 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/5 border-yellow-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-500">Cảnh báo tồn kho thấp</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-500">Giá trị kho hàng</p>
                <h3 className="text-2xl font-bold">4.2 Tỷ VNĐ</h3>
              </div>
              <DollarSign className="h-8 w-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm vật tư..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Danh mục
        </Button>
      </div>

      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên vật tư</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Tồn kho</TableHead>
              <TableHead>Đơn vị</TableHead>
              <TableHead>Đơn giá</TableHead>
              <TableHead>Nhà cung cấp</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMaterials.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium">{material.name}</TableCell>
                <TableCell>{material.category}</TableCell>
                <TableCell>
                  <span className={material.stock < material.minStock ? "text-destructive font-bold" : ""}>
                    {material.stock}
                  </span>
                </TableCell>
                <TableCell>{material.unit}</TableCell>
                <TableCell>{material.pricePerUnit.toLocaleString('vi-VN')} VNĐ</TableCell>
                <TableCell>{material.supplier}</TableCell>
                <TableCell>
                  {material.stock < material.minStock ? (
                    <Badge variant="destructive">Sắp hết</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Còn hàng
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
