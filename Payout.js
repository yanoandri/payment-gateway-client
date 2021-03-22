const Xendit = require('xendit-node')
const { secretKey } = require('./general/general')
const readline = require('readline')

const payment = new Xendit({
    secretKey
})

const { Payout } = payment
const payout = new Payout({})

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let email
let description
let amount
const inputs = []

console.log('Enter your email, amount :')
read.prompt()
read.on('line', data => {
    inputs.push(data)
}).on('close', async () => {
    email = inputs[0]
    amount = inputs[1]

    const data = {
        externalID: `sample-external-id-${Date.now().toString()}`,
        amount,
        email
    }

    console.log('-----Data to be requested-----')
    console.log(data)

    const respCreatePayout = await createPayoutPayment(data)
    console.log(respCreatePayout)

    console.log(`-----Get Data of ID ${respCreatePayout.id}-----`)
    const respGetPayout = await getPayoutDataById(respCreatePayout.id)
    console.log(respGetPayout)

    console.log(`-----Void Data of ID ${respCreatePayout.id}-----`)
    const respVoidPayout = await voidPayoutDataById(respCreatePayout.id)
    console.log(respVoidPayout)

    process.exit(0)
})


async function createPayoutPayment(payoutData){
    return new Promise(((resolve, reject) => {
        payout.createPayout(payoutData)
            .then(r => {
                resolve(r)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    }))
}

async function getPayoutDataById(id){
    return new Promise((resolve, reject) => {
        payout.getPayout({id})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

async function voidPayoutDataById(id){
    return new Promise((resolve, reject) => {
        payout.voidPayout({id})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}


