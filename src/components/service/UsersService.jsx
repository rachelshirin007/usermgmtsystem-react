import axios from 'axios';

class UsersService{
    static BASE_URL = "http://localhost:8080"

    static async login(email, password){
        try{
            const response = await axios.post(`${UsersService.BASE_URL}/auth/login`, {email, password})
            return response.data;

        }catch(error){
            throw error;
        }
    }

    static async register(userData, token){
        try{
            const response = await axios.post(`${UsersService.BASE_URL}/auth/register`, userData,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UsersService.BASE_URL}/admin/get-all-users`,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UsersService.BASE_URL}/adminuser/get-profile`,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UsersService.BASE_URL}/admin/get-users/${userId}`,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UsersService.BASE_URL}/admin/delete/${userId}`,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${UsersService.BASE_URL}/admin/update/${userId}`,userData,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    /*AUTHENTICATION CHECKED */
    static async logoutUser(token){
        try{
            const response = await axios.post(`${UsersService.BASE_URL}/auth/logout`,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            console("response headers")
            console.log(response.headers)
            console.log(response.data)
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    static logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated && this.isAdmin();
    }

}

export default UsersService;