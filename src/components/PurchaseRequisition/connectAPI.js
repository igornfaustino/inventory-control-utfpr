
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

const requestlist=[]


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
