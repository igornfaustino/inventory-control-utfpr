
const requisitionlist=[
    {
        requesterId:'1',
        description:"asdasdasd",
    },
    {
        requesterId:'2',
        description:"hgfhfgh",
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
