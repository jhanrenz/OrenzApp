export interface RevenueChart {
    date: string;
    total: number;
}

export interface TopMenu {
    menu: {
        id: number;
        name: string;
    };
    total_revenue: number;
}

export interface MenusPerCategory {
    id: number;
    name: string;
    menus_count: number;
}

export interface DashboardData {
    summary: {
        total_categories: number;
        total_menus: number;
        total_revenue: number;
    };
    charts: {
        revenue_last_7_days: RevenueChart[];
        top_menus_by_revenue: TopMenu[];
        menus_per_category: MenusPerCategory[];
    };
}