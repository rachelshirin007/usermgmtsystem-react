import axios from 'axios';

class DepartmentService{
    static BASE_URL = "http://localhost:8080"

    static async getAllDepts(token){
        try{
            const response = await axios.get(`${DepartmentService.BASE_URL}/admin/departments/get-all-depts`,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    static async registerDept(deptData, token){
        try{
            const response = await axios.post(`${DepartmentService.BASE_URL}/admin/departments/create-dept`, deptData,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    static async deleteDept(deptId, token){
        try{
            const response = await axios.delete(`${DepartmentService.BASE_URL}/admin/departments/delete-dept${deptId}`,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    static async updateDept(deptId, deptData, token){
        try{
            const response = await axios.put(`${DepartmentService.BASE_URL}/admin/update/${deptId}`, deptData,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    static async getDeptById(deptId, token){
        try{
            const response = await axios.get(`${DepartmentService.BASE_URL}/admin/departments/get-dept-by-id/${deptId}`,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            console.log(response.data.departmentdto)
            return response.data.departmentdto;
            
        }catch(error){
            throw error;
        }
    }



}

export default DepartmentService;
