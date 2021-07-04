import AxiosService from './Axios_Service';

const axios = new AxiosService();

export default class UserService {
    baseUrl = "https://new-bookstore-backend.herokuapp.com/";

    userRegistration = (data) => {
        return axios.postMethod(`${this.baseUrl}bookstore_user/registration`, data);
    }

    userlogin = (data) => {
        return axios.postMethod(`${this.baseUrl}bookstore_user/login`, data);
    }
    getAllBooks = ()=>{
        return axios.getMethod(`${this.baseUrl}bookstore_user/get/book`)       
    }
    cartQuantity = (data, product_id) => {
        return axios.putMethod(`${this.baseUrl}bookstore_user/cart_item_quantity/${product_id}`,data,{
            headers: {
                'x-access-token': localStorage.getItem('usertoken')
            }
        })
    }

    addToCartBook = (data, product_id) => {
        console.log(product_id,data,"axios service");
        return axios.postMethod(`${this.baseUrl}bookstore_user/add_cart_item/${product_id}`,data,{
            headers: {
                'x-access-token': localStorage.getItem('usertoken')
            }
        })
    }

    getCartItems = () => {
        return axios.getMethod(`${this.baseUrl}bookstore_user/get_cart_items`,{
            headers: {
                'x-access-token': localStorage.getItem('usertoken')
            }
        })
    }

    cartIncrementDecrement=(data,cartItem_id)=>{
        return axios.putMethod(`${this.baseUrl}bookstore_user/cart_item_quantity/${cartItem_id}`,data,{
            headers:{
                'x-access-token' :localStorage.getItem('usertoken'),
            } 
        })     
    }
    userDetails=(data)=>{
        return axios.putMethod(`${this.baseUrl}bookstore_user/edit_user`,data,{
            headers:{
                'x-access-token' :localStorage.getItem('usertoken'),
            } 
        })     

    }

   order=(data)=>{
        console.log(localStorage.getItem('usertoken'));
        return axios.postMethod(`${this.baseUrl}bookstore_user/add/order`,data,{
            headers:{
                'x-access-token':localStorage.getItem('usertoken'),
            }
        });
    }
    removeCartItem=(id)=>{
        console.log(id);
        return axios.deleteMethod(`${this.baseUrl}bookstore_user/remove_cart_item/${id}`,{
            headers:{
                'x-access-token':localStorage.getItem('usertoken'),
            }
        });
    }
}

