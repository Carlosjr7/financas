const Modal = {
    open(){
        document.querySelector('.modal-overlay')
        .classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const Transaction = [
    {
        id: 1,
        description: 'Luz',
        amount:-50000,
        date: '03/09/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/09/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount:-20000,
        date: '23/09/2021',

    },
    {
        id: 4,
        description: 'App',
        amount:200000,
        date:'25/09/2021',
    },
]


const transaction = {
    incomes(){
        let income = 0;
        Transaction.forEach(transaction => {
            if( transaction.amount >0 ){
                income += transaction.amount;
            }
        })
        return income
    },
    expenses(){
        let expenses = 0;
        Transaction.forEach(transaction => {
            if( transaction.amount < 0 ){
                expenses += transaction.amount;
            }
        })
        return expenses
       
    },
    total(){
        return transaction.incomes() + transaction.expenses();
    },
}

const DOM ={
    transactionContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionContainer.appendChild(tr)

    },
    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Ultls.formatCurrency(transaction.amount)
    const html = `
    
        <td class="description">${transaction.description}</td>
        <td class=${CSSclass}>${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
        <img src="./assets/minus.svg" alt="Remover Transação">
    </td>`
    return html
    },
    updateBalance() {
        document.getElementById('incomeDisplay')
        .innerHTML = Ultls.formatCurrency(transaction.incomes())

        document.getElementById('expenseDisplay')
        .innerHTML = Ultls.formatCurrency(transaction.expenses())

        document.getElementById('totalDisplay')
        .innerHTML = Ultls.formatCurrency(transaction.total())
    }
}

const Ultls = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "" )

        value = Number(value) /100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value

    }

}

Transaction.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()