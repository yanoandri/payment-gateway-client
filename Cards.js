const Xendit = require('xendit-node')
const { secretKey } = require('./general/general')
const readline = require('readline')

const payment = new Xendit({
    secretKey
})

const { Card } = payment
const card = new Card({})

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let tokenId
let authId
let amount
const inputs = []

console.log('Put in order tokenId, authId, amount')
read.prompt()
read.on('line', data => {
    inputs.push(data)
}).on('close', async () => {
    tokenId = inputs[0]
    authId = inputs[1]
    amount = inputs[2]

    const data = {
        externalID: `sample-external-id-${Date.now().toString()}`,
        tokenID: tokenId,
        amount: amount,
        authID: authId
    }

    console.log('-----Data to be requested-----')
    console.log(data)

    const resp = await createCharge(data)
    console.log(resp)

    process.exit(0)
})

async function createAuthorization(authorizationData) { 
    return new Promise((resolve, reject) => {
        card.createAuthorization(authorizationData)
            .then(r => {
                resolve(r)
            }).catch(err => {
                reject(err)
            })
    })
}

async function createCharge(chargeData){
    return new Promise(((resolve, reject) => {
        card.createCharge(chargeData)
            .then(r => {
                resolve(r)
            })
            .catch(err => {
                reject(err)
            })
    }))
}