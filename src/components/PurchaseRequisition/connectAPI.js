/*const Purchasechema = mongoose.Schema({
    management: String,
    requisitionDate: String,
    UGR: String,
    sector: String,
    requester: String,
    requisitionItems: [{
        siorg: String,
        description: { type: String, require: true },
        justification: { type: String, require: true },
        prices: [
            {
                type: { type: String, require: true },
                priceRef: String,
                value: Number
            }
        ],
        priceJustification: String,
        qtd: { type: Number, require: true },
        itemSupplier: {
            name: String,
            cnpj: String,
            phone: String,
            address: {
                number: Number,
                street: String,
                city: String,
                state: String,
                country: String,
            }
        },
    }],
});*/
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


export const loadRequisition = (id)=>{
    return requisitionlist.requesterId === id
}
export const loadAllRequisition = ()=>{
    return requisitionlist
}

export const addRequest= (request)=>{
    console.log("request adicionada")
    requestlist.push(request)
}
export const loadAllPurchaseRequisition= () =>{
    console.log("Carregado ",requestlist.length, " do banco de dados!")
    return requestlist
}
export const loadPurchaseRequisition= (id) =>{
    const element = requestlist.filter((e)=> e.purchaseId == id)
    console.log("Carregado item:",element[0].purchaseId, " do banco de dados!")
    return element[0]
}
