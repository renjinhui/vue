const _ = require('lodash');

const InitialState = {
    status:'loading',
    data:{},
    bankList: []
};

export const getTakeNowData = (state = InitialState, action) =>{
    switch (action.type){

        case 'TK_Account_Info':
            return _.assign({}, state, {
                    status:action.status,
                    data:_.assign({},action.data)
                });

        case 'TK_BANK_LIST':
            return _.assign({}, state, {
                bankList: action.data
            });

        default: return state;
    }
};