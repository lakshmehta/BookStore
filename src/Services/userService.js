import AxiosService from './Axios_Service';

const axios_service = new AxiosService();

export default class UserService {
    baseUrl = "https://new-bookstore-backend.herokuapp.com/bookstore_user";

    userRegistration = (data) => {
        return axios_service.postMethod(`${this.baseUrl}/registration`, data);
    }

    userlogin = (data) => {
        return axios_service.post(`${this.baseUrl}/login`, data);
    }
    getAllBooks = ()=>{
        return axios_service.get(`${this.baseUrl}/get/book`)       
    }
    cartQuantity = (data, product_id) => {
        return axios_service.put(`${this.baseUrl}/cart_item_quantity/${product_id}`,data,{
            headers: {
                'x-access-token': localStorage.getItem('usertoken')
            }
        })
    }

    addToCartBook = (data, product_id) => {
        return axios_service.post(`${this.baseUrl}/add_cart_item/${product_id}`,data,{
            headers: {
                'x-access-token': localStorage.getItem('usertoken')
            }
        })
    }

    getCartItems = () => {
        return axios_service.get(`${this.baseUrl}/get_cart_items`,{
            headers: {
                'x-access-token': localStorage.getItem('usertoken')
            }
        })
    }

    cartIncrementDecrement=(data,cartItem_id)=>{
        return axios_service.put(`${this.baseUrl}/cart_item_quantity/${cartItem_id}`,data,{
            headers:{
                'x-access-token' :localStorage.getItem('usertoken'),
            } 
        })     
    }
    userDetails=(data)=>{
        return axios_service.put(`${this.baseUrl}/edit_user`,data,{
            headers:{
                'x-access-token' :localStorage.getItem('usertoken'),
            } 
        })     

    }

   order=(data)=>{
        return axios_service.post(`${this.baseUrl}/add/order`,data,{
            headers:{
                'x-access-token':localStorage.getItem('usertoken'),
            }
        });
    }
    removeCartItem=(id)=>{
        return axios_service.delete(`${this.baseUrl}/remove_cart_item/${id}`,{
            headers:{
                'x-access-token':localStorage.getItem('usertoken'),
            }
        });
    }
    addToWishList=()=>{
        return axios_service.post(` ${this.baseUrl}/add_wish_list/${product_id}`,null,{
            headers:{
                'x-access-token':localStorage.getItem('usertoken')
            }
        });
    }
}

