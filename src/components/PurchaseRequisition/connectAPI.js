
import axios from 'axios';
const requisitionlist=[
    {
        id: 'id123',
        siorg: '12312',
        description: 'descricao...............',
        checked: false,
        change: this.handleClick
    },
    {
        id: 'id124',
        siorg: '12313123132',
        description: 'descricao...............',
        checked: false,
        change: this.handleClick
    }

]

const requestlist=[
    {
        purchaseId: 1231412,
        management: 'utfpr',
        requisitionDate: "2018-05-05",
        UGR: 'Laboratorio de Computacao',
        originOfCost: 'materiais de consumo',
        sector: 'DACOM',
        requester: 'xurumino',
        requisitionItems: [
            {
                id: '1',
                siorg: '1',
                description: 'dasdasdsad',
            },
            {
                id: '2',
                siorg: 'das1',
                description: 'kujadfnalkfdasdasdsad',
            }
        ],
    }
]


export async function loadRequisition(id){
    console.log("Loading Requisition!", id)
    return await loadAllRequisition( (value)=>{
        return value.requisition._id === id
    })
}
export async function loadAllRequisition() {
    console.log("Loading Requisitions!")
    return await axios.get('/requisitions').then(response => {
        if (response.status === 200) {
            let requisitions = response.data.requisitions;
            
            return ({
                requisition:requisitions,
                loading:false
            })
        }
    }).catch(ex => {
        console.error(ex, ex.response);
    })
}

export const addRequest= (request)=>{
    console.log("request adicionada")
    requestlist.push(request)
}
export async function loadPurchaseRequisition(id) {
    return await axios.get('/purchase/'+id).then(response => {
        if (response.status === 200) {
            return ({
                purchases:response.data.purchase,
                loading:false
            })
        }
    }).catch(ex => {
        console.error(ex, ex.response);
    })
}
export async function savePurchaseRequisition(purchase) {
    return await axios.post('/purchase',purchase ).then(response => {
        if (response.status === 200) {
            console.log(response)
            return (response.data._id)
        }
    })
    .catch(ex => {
        console.error(ex, ex.response);
    })
}
export async function updatePurchaseRequisition(purchase) {
    console.log(purchase)
    return await axios.put('/purchase/'+purchase._id,purchase ).then(response => {
        if (response.status === 200) {
            console.log(response)
            return (response.data._id)
        }
    })
    .catch(ex => {
        console.error(ex, ex.response);
    })
}
export async function loadAllPurchaseRequisition() {
    return await axios.get('/purchase').then(response => {
        if (response.status === 200) {
            let purchases = response.data.purchases;
                
                return ({
                    purchases:purchases,
                    loading:false
                })
            
        }
    }).catch(ex => {
        console.error(ex, ex.response);
    })
}