import axios from 'axios';

class CheckInService{
    static BASE_URL = "http://localhost:8080"

    

    static async getAllCheckIns(token){
        try{
            const response = await axios.get(`${CheckInService.BASE_URL}/adminuser/checkin/get-all-checkins`,
            {
                headers: {Authorization : `Bearer ${token}`}
            })
            console.log("ser" + response.data)
            return response.data;
            
        }catch(error){
            throw error;
        }
    }

    
}

export default CheckInService;