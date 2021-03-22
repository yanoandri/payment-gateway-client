const Xendit = require('xendit-node')
const { secretKey } = require('./general/general')
const readline = require('readline')
const { resolve } = require('path')

const payment = new Xendit({
    secretKey
})

const { VirtualAcc } = payment
const virutalAcc = new VirtualAcc({})

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let name
const inputs = []

console.log('Enter your name :')
read.prompt()
read.on('line', data => {
    inputs.push(data)
}).on('close', async () => {
    name = inputs[0]

    const data = {
        externalID: `sample-external-id-${Date.now().toString()}`,
        bankCode: 'MANDIRI',
        name
    }

    console.log('-----Data to be requested-----')
    console.log(data)

    const respCreateVA = await createVirtualAccount(data)
    console.log(respCreateVA)

    const respGetVa = await getVirtualAccount(data.id)
    console.log(respGetVa)

    process.exit(0)
})


async function createVirtualAccount(vaTransactionData){
    return new Promise(((resolve, reject) => {
        virutalAcc.createFixedVA(vaTransactionData)
            .then(r => {
                resolve(r)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    }))
}

async function getVirtualAccount(id){
    return new Promise((resolve, reject) => {
        virutalAcc.getFixedVA({
            id
        })
        .then(res => {
            resolve(res)
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })   
}