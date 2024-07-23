import axios from "axios"

const base_url = 'https://crm-server-q226.onrender.com/api/v1'




export const post_api_request = async (endpoint: string, payload: any) => {
    try {
        const response = await axios.post(`${base_url}/${endpoint}`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = response;
        return data;
    } catch (err: any) {
        return err;
    }
};


export const post_api_auth_request = async (endpoint: string, payload: any) => {
    try {
        const auth_id = localStorage.getItem('x-id-key')
        const response = await axios.post(`${base_url}/${endpoint}`, payload, {
            headers: {
                "Content-Type": "application/json",
                "x-id-key": auth_id
            }
        });

        const data = response;
        return data;
    } catch (err: any) {
        return err;
    }
};
export const patch_api_auth_request = async (endpoint: string, payload: any) => {
    try {
        const auth_id = localStorage.getItem('x-id-key')
        const response = await axios.patch(`${base_url}/${endpoint}`, payload, {
            headers: {
                "Content-Type": "application/json",
                "x-id-key": auth_id
            }
        });

        const data = response;
        return data;
    } catch (err: any) {
        return err;
    }
};


export const get_api_auth_request = async (endpoint: string) => {
    try {
        const auth_id = localStorage.getItem('x-id-key')
        const response = await axios.get(`${base_url}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                "x-id-key": auth_id
            }
        });

        const data = response;
        return data;
    } catch (err: any) {
        return err;
    }
};


export const count_users_request = async (endpoint: string) => {
    try {
        const response = await axios.get(`${base_url}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = response;
        return data;
    } catch (err: any) {
        return err;
    }
};

export const admin_dashboard_request = async (endpoint: string, page_number: number, notification_page_number: number) => {
    try {
        const auth_id = localStorage.getItem('x-id-key')
        const response = await axios.get(`${base_url}/${endpoint}/${page_number}/${notification_page_number}`, {
            headers: {
                "Content-Type": "application/json",
                "x-id-key" : auth_id
            }
        });

        const data = response;
        return data;
    } catch (err: any) {
        return err;
    }
};

