const matchCount = (reqString, offString) => {
    const reqWordArray = reqString.split(/,|, |\s/).filter(value => value !== '').map(value => value.toLowerCase())
    const offWordArray = offString.split(/,|, |\s/).filter(value => value !== '').map(value => value.toLowerCase())
    // console.log(reqWordArray, offWordArray);
    const matchedWords = reqWordArray.map((value) => {
        if (offWordArray.includes(value)) {
            return value
        } else {
            return ''
        }
    })
    return matchedWords.filter(value => value !== '')
}

module.exports = {
    matchCount
}