const Xendit = require('xendit-node')
const { secretKey } = require('./general/general')
const readline = require('readline')
const { resolve } = require('path')

const payment = new Xendit({
    secretKey
})

const { RecurringPayment } = payment
const recurring = new RecurringPayment({})

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let email
let description
let amount
const inputs = []

console.log('Enter your email, description, amount :')
read.prompt()
read.on('line', data => {
    inputs.push(data)
}).on('close', async () => {
    email = inputs[0]
    description = inputs[1]
    amount = inputs[2]

    const data = {
        externalID: `sample-external-id-${Date.now().toString()}`,
        amount,
        payerEmail: email,
        interval: RecurringPayment.Interval.Month,
        intervalCount: 1,
        description
    }

    console.log('-----Data to be requested-----')
    console.log(data)

    const respCreateRecurring = await createRecurringPayment(data)
    console.log(respCreateRecurring)

    console.log(`-----Get Data of ID ${respCreateRecurring.id}-----`)
    const respGetRecurring = await getRecurringPaymentById(respCreateRecurring.id)
    console.log(respGetRecurring)

    console.log(`-----Stopping Recurrent Data of ID ${respCreateRecurring.id}-----`)
    const respStopRecurring = await stopRecurringPaymentById(respCreateRecurring.id)
    console.log(respStopRecurring)

    process.exit(0)
})


async function createRecurringPayment(recurringData){
    return new Promise(((resolve, reject) => {
        recurring.createPayment(recurringData)
            .then(r => {
                resolve(r)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    }))
}

async function getRecurringPaymentById(id){
    return new Promise((resolve, reject) => {
        recurring.getPayment({id})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

async function stopRecurringPaymentById(id){
    return new Promise((resolve, reject) => {
        recurring.stopPayment({id})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

async function pauseRecurringPaymentById(id){
    return new Promise((resolve, reject) => {
        recurring.pausePayment({id})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

async function resumeRecurringPaymentById(id){
    return new Promise((resolve, reject) => {
        recurring.resumePayment({id})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

async function editRecurringPaymentById(data){
    return new Promise((resolve, reject) => {
        recurring.editPayment(data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}



