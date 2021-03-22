//ovo ewallet payment
const Xendit = require('xendit-node')
const readline = require('readline')
const { secretKey } = require('./general/general')

const payment = new Xendit({
    secretKey: secretKey
})

const { EWallet } = payment
const ewallet = new EWallet({})

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let phone
let amount
const inputs = []

console.log('Put in amount, phone number9')
read.prompt()
read.on('line', data => {
    inputs.push(data)
}).on('close', async () => {
    amount = inputs[0]
    phone = inputs[1]

    // const data = {
    //     externalID: `sample-external-id-${Date.now().toString()}`,
    //     amount,
    //     phone,
    //     ewalletType: EWallet.Type.OVO,
    //     callbackUrl: 'https://www.google.com'
    // }

    console.log('-----Data to be requested-----')
    console.log('sample-external-id-1606190341227')

    // const response = await createEwalletPayment(data)

    const response = await getEwalletPaymentData({
        externalID: 'sample-external-id-1606190341227',
        ewalletType: EWallet.Type.OVO
    })

    console.log(response)

    process.exit(0)
})

async function createEwalletPayment(ewalletData){
    return new Promise((resolve, reject) => {
        ewallet.createPayment(ewalletData)
            .then(res => {
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

async function getEwalletPaymentData(data){
    return new Promise((resolve, reject) => {
        ewallet.getPayment(data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}