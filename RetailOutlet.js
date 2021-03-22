const Xendit = require('xendit-node')
const { secretKey } = require('./general/general')
const readline = require('readline')
const { resolve } = require('path')

const payment = new Xendit({
    secretKey
})

const { RetailOutlet } = payment
const retailOutlet = new RetailOutlet({})

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let name
let amount
const inputs = []

console.log('Enter your name, amount :')
read.prompt()
read.on('line', data => {
    inputs.push(data)
}).on('close', async () => {
    name = inputs[0]
    amount = inputs[1]

    const data = {
        externalID: `sample-external-id-${Date.now().toString()}`,
        retailOutletName: 'ALFAMART',
        name,
        expectedAmt: amount
    }

    console.log('-----Data to be requested-----')
    console.log(data)

    const respCreateRetail = await createFixedPaymentCode(data)
    console.log(respCreateRetail)

    process.exit(0)
})


async function createFixedPaymentCode(retailData){
    return new Promise(((resolve, reject) => {
        retailOutlet.createFixedPaymentCode(retailData)
            .then(r => {
                resolve(r)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    }))
}

async function getFixedPaymentCode(id){
    return new Promise((resolve, reject) => {
        retailOutlet.getFixedPaymentCode({id})
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}