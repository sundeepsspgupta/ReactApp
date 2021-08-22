import axios from "axios";

const baseUrl = "http://localhost:56150/api/"



export default {
    customer(url = baseUrl + 'customerInfo/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },

    mortgageApi(url = baseUrl + 'Mortgage/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },

    dropdownApi(url = baseUrl + 'MortgageType/') {
        return {
            fetchAll: () => axios.get(url),
        }
    }
}

