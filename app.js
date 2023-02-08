const quoteContainer = document.getElementById('quote-container')
const quote = document.getElementById('quote')
const author = document.getElementById('author')
const btn = document.getElementById('new-quote')
const twitterBtn = document.getElementById('twitter')
const loader = document.querySelector('.loader')
let apiQuotes = [];

window.addEventListener("load", (event) => {
    getQuotes()
});

// Show Loading
function loading (){
loader.hidden = false
quoteContainer.hidden = true
}

// hide Loading
function complete () {
    quoteContainer.hidden = false
    loader.hidden = true
}

// show new quote
function newQuote() {
    loading ()
    // pick a random quote from apiQuotes array
    const quoteArr = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    if (!quoteArr.author) {
        author.innerText = 'UnKnown'
    } else {
        author.innerText = quoteArr.author
    }


    if (quoteArr.text.length > 100) {
        quote.classList.add('long-quote')
    } else {
        quote.classList.remove('long-quote')
    }
    quote.innerText = quoteArr.text
    complete () 
}

// get quote from api
async function getQuotes() {
    loading ()
    const apiUrl = `https://jacintodesign.github.io/quotes-api/data/quotes.json`

    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        console.log(error)
    }

}

btn.addEventListener("click", () => {
    getQuotes()
})

twitterBtn.addEventListener("click", () => {
    tweetQuote()
})

// Tweet Quote
function tweetQuote() {
    const twitterUrl = ` https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`
    window.open(twitterUrl, '__blank')
}

