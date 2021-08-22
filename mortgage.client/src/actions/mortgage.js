import api from "./api";

export const ACTION_TYPES = {
    SET_CURRENT_MORTGAGE: 'SET_CURRENT_MORTGAGE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

export const fetchAllMortgage = () => dispatch => {
    api.mortgageApi().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const createMortgage = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.mortgageApi().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.mortgageApi().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const DeleteMortgage = (id, onSuccess) => dispatch => {
    api.mortgageApi().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const SetCurrentMortgage = (MortgageForm) => dispatch => {
    dispatch({
        type: ACTION_TYPES.SET_CURRENT_MORTGAGE,
        payload: MortgageForm
    })
}