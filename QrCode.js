const Xendit = require('xendit-node')
const { secretKey } = require('./general/general')
const readline = require('readline')

const payment = new Xendit({
    secretKey
})

const { QrCode } = payment
const qrCode = new QrCode({})
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let amount
const inputs = []

console.log('Enter your desired amount :')
read.prompt()
read.on('line', data => {
    inputs.push(data)
}).on('close', async () => {
    amount = inputs[0]

    const data = {
        externalID: `sample-external-id-${Date.now().toString()}`,
        type: QrCode.Type.Dynamic,
        callbackURL: 'https://httpstat.us/200',
        amount
    }

    console.log('-----Data to be requested-----')
    console.log(data)

    const respCreateQr = await createQrCodesPayment(data)
    console.log(respCreateQr)

    console.log(`-----Get Data of ID ${respCreateQr.external_id}-----`)
    const respGetQrCode = await getQrCodeDataById(respCreateQr.external_id)
    console.log(respGetQrCode)

    console.log(`-----Simulate Data of ID ${respCreateQr.external_id}-----`)
    const respSimulate = await simulatePaymentById(respCreateQr.external_id)
    console.log(respSimulate)

    process.exit(0)
})


async function createQrCodesPayment(qrCodesData){
    return new Promise(((resolve, reject) => {
        qrCode.createCode(qrCodesData)
            .then(r => {
                resolve(r)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    }))
}

async function getQrCodeDataById(id){
    return new Promise((resolve, reject) => {
        qrCode.getCode({externalID: id})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

async function simulatePaymentById(id){
    return new Promise((resolve, reject) => {
        qrCode.simulate({externalID: id})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}


