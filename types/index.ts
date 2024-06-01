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

export interface SearchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer: string)=>void
}

export interface InputProps {
    title: string;
    placeholder: string;
}

export interface SchedulingTabProps {
    tab: string;
    setTab: (tab: string) => void; 
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