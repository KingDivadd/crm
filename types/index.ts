import { MouseEventHandler } from "react";

export interface CustomButtonProps {
title: string;
containerStyles?: string;
handleClick?: MouseEventHandler<HTMLButtonElement>;
btnType?: "button"|"submit";
disabledd?: boolean;
}

export interface CustomFilterProps {
    title: string;
}

export interface SideBarNav {
    active: string;
    setActive: (active: string)=>void
}

export interface InputProps {
    title: string;
    placeholder: string;
}

export interface SchedulingTabProps {
    tab: string;
    setTab: (tab: string) => void; 
}

export interface AlertProps {
    message: string;
    type: string;
}
export interface AddUsersProps {
    addUsers: boolean;
    number_of_users?: number;
    setAddUsers: (addUsers: boolean) => void;
    selectedUser: any;
    setSelectedUser: (selectedUser:any) => void;
}

export interface PatientTabProps {
    patient_tab: string;
    setPatient_tab: (patient_tab: string)=> void;
}

export interface MessageModalProps {
    messageModal: boolean;
    message: any[]; 
    setMessage: (message: any[]) => void;
    setMessageModal: (messageModal: boolean) => void;
    selectedMessage: any;
    setSelectedMessage: (selectedMessage: any) => void
}

export interface UserModalProps {
    userModal: boolean;
    setUserModal: (userModal: boolean) => void;
    userList: any[];
    setUserList: (userList: any[]) => void;
    selectedUser: any;
    setSelectedUser: (selectedUser: any) => void
}

export interface MenuRoleModalProps {
    menuRoleModal: boolean;
    setMenuRoleModal: (menuRoleModal: boolean) => void;
    menuRoleList: any[];
    setMenuRoleList: (menuRoleList: any[]) => void;
    selectedMenuRole: any;
    setSelectedMenuRole: (selectedMenuRole: any) => void
}

export type HandleDropMenuFunction = (dropdown: any) => void;

export type HandleDropDownFunction = (dropdown: string, title:any) => void;

export interface DropDownProps {
    title: any; 
    dropArray: string[];
    handleDropMenu: HandleDropMenuFunction;
    handleSelectDropdown: HandleDropDownFunction;
    dropElements: any; 
    dropMenus:any; 
    setDropElements: (dropElements: any) => void, 
    setDropMenus: (dropMenus: any) => void 
}
export type HandleViewContractDetails = ()=> void;

export interface SalesContractDetailProps {
    viewContractDetails: HandleViewContractDetails
}

export interface SalesTaskProps {
    addTask: boolean;
    show: boolean;
    setShow: (show: boolean) => void;
    selectedTask: any;
    setSelectedTask: (selectedTask: any) => void;

}

export interface OpsLeadProps {
    addLead: boolean;
    show: boolean;
    setShow: (show: boolean) => void;
    selectedLead: any;
    setSelectedLead: (selectedLead: any) => void;

}

export interface OpsInvoiceProps {
    addInvoice: boolean;
    setAddInvoice: (addInvoice: boolean) => void;
    selectedInvoice: any;
    setSelectedInvoice: (selectedInvoice: any) => void;
    show: boolean;
    setShow: (show: boolean) => void;
}

export interface RouteNavProps {
    userRole: string;
}

export interface SideBarProps {
    userRole: string;
    sidebar_tab: string;
    setSidebar_tab: (patient_tab: string)=> void;
}

export interface SelectDateProps {
    clickedDate: string; 
    setClickedDate: (clickedDate: string)=> void;
}

export interface ImageUploaderProps {
    title: string;
    url: string;
    id: string;
    image: string;
}

export interface ProjectImageUploaderProps {
    title: string;
    url: string;
    id: string;
    disabled: boolean;
    handleUploadClick: () => void;
}

export interface JobListProps {
    title: string;
    value: string;
}

export interface DeleteTaskProps {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
    show: boolean;
    setShow: (show: boolean) => void;
}

export interface AdminShortcutProps {
    selectedItem:any;
    setSelectedItem:(selectedItem:any) => void;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

export interface UserDeleteProps {
    selectedUser:any;
    setSelectedUser:(selectedUser:any) => void;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

export interface UpdateTaskProps {
    
    edit:boolean;
    setEdit: (edit: boolean) => void;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
    show: boolean;
    setShow: (show: boolean) => void;
}



export interface InvoiceModalProps {
    showInvoice: boolean;
    setShowInvoice: (showInvoice: boolean)=> void;
    show: boolean;
    setShow: (show: boolean) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem:any)=> void;
}

export interface RedlineProps {
    showRedlineModal: boolean;
    setShowRedlineModal: (showRedlineModal: boolean)=> void;
    show: boolean;
    setShow: (show: boolean) => void;
}

export interface PipelineProps {
    showDetails: boolean;
    setShowDetails: (showDetails: boolean) => void;
}

export interface Leads_Props {
    forEach(arg0: (data: any, ind: number) => void): unknown;
    filter(arg0: (user: any) => any): unknown;
    map(arg0: (data: any) => void): unknown;
    total_number_of_leads_pages:number;
    total_number_of_leads:number;
    leads:any;
}

export interface User_Management_Props {
    forEach(arg0: (data: any, ind: number) => void): unknown;
    filter(arg0: (user: any) => any): unknown;
    map(arg0: (data: any) => void): unknown;
    total_number_of_pages:number;
    total_number_of_users:number;
    users:any;
}

export interface Admin_dashboard_props {
    total_number_of_leads: number;
    total_number_of_sales: number;
    total_number_of_installations: number;
    total_number_of_projects: number;
    msg?: string;
    activities?:any;
    total_number_of_recent_activities?:number ;
    total_number_of_recent_activities_pages?:number
    new_lead?: any;
    ongoing_installations?: any;
    pending_sales?: any;
    open_service_tickets?: any;
    pending_payments?: any;
    engineering_task?: any;
    permit?: any;
    accounting?: any;
    task_notification?: any;
    total_number_of_task_notification?:number;
    total_number_of_task_notifications_pages?:number

  }
  
  export interface Sales_Dashboard_Props {
    total_lead: number;
    total_sales: number;
    conversion_rate: any;
    pending_task: number;
    recent_activities: any;
    recent_notifications: any;
    recent_tasks: any;
  }


export const opsStages = [
    {
        title: "HOA Approval",
        projects: [
            { id: 201, name: "Project Alpha", status: "Pending" },
            { id: 202, name: "Project Beta", status: "Approved" },
        ],
    },
    {
        title: "Engineering",
        projects: [
            { id: 203, name: "Project Gamma", status: "In Progress" },
        ],
    },
    {
        title: "Permit Approval",
        projects: [
            { id: 204, name: "Project Delta", status: "Submitted" },
        ],
    },
    {
        title: "Installation",
        projects: [
            { id: 205, name: "Project Epsilon", status: "Scheduled" },
        ],
    },
];

export const salesFunnelStages = [
    {
        title: "Lead Generation",
        projects: [
            { id: 301, name: "Lead 1", status: "New" },
            { id: 302, name: "Lead 2", status: "New" },
            { id: 303, name: "Lead 3", status: "New" },
            { id: 304, name: "Lead 4", status: "New" },
            { id: 305, name: "Lead 5", status: "New" },
        ],
    },
    {
        title: "Qualification",
        projects: [
            { id: 306, name: "Lead 6", status: "Qualified" },
            { id: 307, name: "Lead 7", status: "Qualified" },
            { id: 308, name: "Lead 8", status: "Qualified" },
            { id: 309, name: "Lead 9", status: "Qualified" },
            { id: 310, name: "Lead 10", status: "Qualified" },
        ],
    },
    {
        title: "Proposal",
        projects: [
            { id: 311, name: "Lead 11", status: "Proposal Sent" },
            { id: 312, name: "Lead 12", status: "Proposal Sent" },
            { id: 313, name: "Lead 13", status: "Proposal Sent" },
        ],
    },
    {
        title: "Negotiation",
        projects: [
            { id: 314, name: "Lead 14", status: "In Negotiation" },
            { id: 315, name: "Lead 15", status: "In Negotiation" },
        ],
    },
    {
        title: "Closed Sales",
        projects: [
            { id: 316, name: "Lead 16", status: "Closed" },
            { id: 317, name: "Lead 17", status: "Closed" },
            { id: 318, name: "Lead 18", status: "Closed" },
        ],
    },
    {
        title: "Lost Opportunities",
        projects: [
            { id: 319, name: "Lead 19", status: "Lost" },
            { id: 320, name: "Lead 20", status: "Lost" },
        ],
    },
];

export interface SalesFunnelProps {
    status: string;
}

export interface SchedulingAndLogisticDataProps {
    task: string;
    date: string;
    team: string;
}


export interface Task {
    task: string;
    date: string;
    status: string;
    team: string;
}

export type Columns = {
    Scheduled: Task[];
    'In Progress': Task[];
    Completed: Task[];
}


export const tasks: Task[] = [
    { task: "Schedule Installation", date: "01/10/2024", status: "Scheduled", team: "Team A" },
    { task: "HOA Approval", date: "01/09/2024", status: "Completed", team: "Team B" },
    { task: "Engineering Review", date: "01/15/2024", status: "In Progress", team: "Team C" },
    { task: "Material Delivery", date: "01/18/2024", status: "Scheduled", team: "Team D" },
    { task: "Installation", date: "01/20/2024", status: "In Progress", team: "Team A" },
    { task: "Final Inspection", date: "01/22/2024", status: "Completed", team: "Team E" },
];


export const paymentSection = [
    {phase: "Deposit", status: "Paid", amount: "$1,000", dateReceived: "June 11, 2024"},
    {phase: "Scheduling", status: "Paid", amount: "$2,000", dateReceived: "June 12, 2024"},
    {phase: "Delivery", status: "Pending", amount: "$1,500", dateReceived: "N/A"},
    {phase: "Construction Completion", status: "Pending", amount: "$3,000", dateReceived: "N/A"},
    {phase: "Electrical Completion", status: "Pending", amount: "$500", dateReceived: "N/A"},

]