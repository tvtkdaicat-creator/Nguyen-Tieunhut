import { Project, Material, Labor, BudgetEntry, Supplier } from '@/types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Chung cư Skyline',
    location: 'Quận Trung tâm',
    status: 'In Progress',
    progress: 65,
    budget: 25000000000,
    spent: 16250000000,
    startDate: '2023-01-15',
    endDate: '2024-06-30',
    manager: 'Nguyễn Văn A'
  },
  {
    id: '2',
    name: 'Cải tạo Cầu Đông',
    location: 'Sông phía Đông',
    status: 'Planning',
    progress: 15,
    budget: 8000000000,
    spent: 500000000,
    startDate: '2024-03-01',
    endDate: '2024-12-15',
    manager: 'Trần Thị B'
  },
  {
    id: '3',
    name: 'Khu Công nghệ Giai đoạn 2',
    location: 'Thung lũng Đổi mới',
    status: 'Delayed',
    progress: 45,
    budget: 50000000000,
    spent: 28000000000,
    startDate: '2023-06-10',
    endDate: '2025-02-20',
    manager: 'Lê Văn C'
  }
];

export const mockMaterials: Material[] = [
  {
    id: 'm1',
    name: 'Xi măng PC40',
    category: 'Vật liệu Thô',
    unit: 'Bao',
    stock: 450,
    minStock: 100,
    pricePerUnit: 95000,
    supplier: 'Tổng Công ty Xi măng'
  },
  {
    id: 'm2',
    name: 'Thép Phi 12',
    category: 'Sắt Thép',
    unit: 'Tấn',
    stock: 5,
    minStock: 10,
    pricePerUnit: 15500000,
    supplier: 'Thép Hòa Phát'
  },
  {
    id: 'm3',
    name: 'Dây điện 2.5mm',
    category: 'Thiết bị Điện',
    unit: 'Cuộn',
    stock: 120,
    minStock: 50,
    pricePerUnit: 450000,
    supplier: 'Thiết bị Điện Việt'
  }
];

export const mockLabor: Labor[] = [
  {
    id: 'l1',
    name: 'Nguyễn Hoàng Nam',
    role: 'Giám sát Công trường',
    skillLevel: 'Senior',
    status: 'Active',
    assignedProject: 'Chung cư Skyline',
    dailyRate: 800000
  },
  {
    id: 'l2',
    name: 'Phạm Minh Đức',
    role: 'Thợ điện',
    skillLevel: 'Lead',
    status: 'Active',
    assignedProject: 'Chung cư Skyline',
    dailyRate: 600000
  },
  {
    id: 'l3',
    name: 'Trần Văn Hùng',
    role: 'Thợ xây',
    skillLevel: 'Mid',
    status: 'On Leave',
    dailyRate: 450000
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: 's1',
    name: 'Tổng Công ty Xi măng',
    category: 'Bê tông',
    contact: 'sales@ximang.vn',
    rating: 4.8,
    location: 'Khu Công nghiệp A'
  },
  {
    id: 's2',
    name: 'Thép Hòa Phát',
    category: 'Sắt Thép',
    contact: 'orders@hoaphat.com',
    rating: 4.5,
    location: 'Quận Cảng'
  }
];
