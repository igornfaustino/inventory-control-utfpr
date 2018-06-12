import axios from 'axios';

export async function loadRequisition(id) {

    return await axios.get('/requisition/' + id).then(response => {
        if (response.status === 200) {
            return ({
                requisition: response.data.requisition,
                loading: false
            })
        }
    }).catch(ex => {
        console.error(ex, ex.response);
    })
}
export async function loadAllRequisition() {
    console.log("Loading Requisitions!");
    return await axios.get('/requisitions').then(response => {
        if (response.status === 200) {
            let requisitions = response.data.requisitions;

            return ({
                requisition: requisitions,
                loading: false
            })
        }
    }).catch(ex => {
        console.error(ex, ex.response);
    })
}

export async function loadPurchaseRequisition(id) {
    return await axios.get('/purchase/' + id).then(response => {
        if (response.status === 200) {
            let purchase = response.data.purchase;
            purchase.requisitionItems = prepareRequistionItems(purchase.requisitionItems);
            return ({
                purchases: purchase,
                loading: false
            })
        }
    }).catch(ex => {
        console.error(ex, ex.response);
    })
}
export async function savePurchaseRequisition(purchase) {
    let newpurchase = purchase;
    let newItem = [];
    purchase.requisitionItems.forEach((item) => {
        newItem.push({ item: item._id, itemSupplier: item.itemSupplier })
    });
    newpurchase.requisitionItems = newItem;

    return await axios.post('/purchase', newpurchase).then(response => {
        if (response.status === 200) {
            alert("Adicionado com sucesso!");
            return (response.data._id)
        }
    })
        .catch(ex => {
            alert("Não Foi possivel conectar ao servidor");
            console.error(ex, ex.response);
        })
}
export async function updatePurchaseRequisition(purchase) {
    let newpurchase = purchase;
    let newItem = [];
    purchase.requisitionItems.forEach((item) => {
        newItem.push({ item: item._id, itemSupplier: item.itemSupplier })
    });
    newpurchase.requisitionItems = newItem;

    return await axios.put('/purchase/' + newpurchase._id, newpurchase).then(response => {
        if (response.status === 200) {
            alert("Atualizado com sucesso!");
            return (response.data._id)
        }
    })
        .catch(ex => {
            alert("Não Foi possivel conectar ao servidor");
            console.error(ex, ex.response);
        })
}
function prepareRequistionItems(requisitionItems) {

    let newrequisitionItems = [];

    requisitionItems.forEach((item) => {
        if (item.item) {
            newrequisitionItems.push(
                {
                    _id: item.item._id,
                    description: item.item.description,
                    justification: item.item.justification,
                    qtd: item.item.qtd,
                    quotation: item.item.quotation,
                    status: item.item.status,
                    itemSupplier: item.itemSupplier
                }
            )
        }
    });

    return newrequisitionItems
}
export async function loadAllPurchaseRequisition() {
    return await axios.get('/purchase').then(response => {
        if (response.status === 200) {
            let purchases = response.data.purchases;
            let newpurchases = [];
            purchases.forEach(purch => {
                let purch2 = purch;
                purch2.requisitionItems = prepareRequistionItems(purch.requisitionItems);
                newpurchases.push(purch2)
            });
            return ({
                purchases: newpurchases,
                loading: false
            })

        }
    }).catch(ex => {
        console.error(ex, ex.response);
    })
}