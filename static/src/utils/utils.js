export function matchCast(cards) {
    let searched = {
        done: true,
        results: false
    }
    for (let card of cards) {
        let crewsList = cards.filter(value => value !== card).map(movie => {
            return movie.movieinfo.Cast.map(member => member.id)
        })
        for (let member of card.movieinfo.Cast) {
            let matched = crewsList.map(crew => { return crew.includes(member.id) })
            member.matched = matched.every(match => match === true)
            if (member.matched) {
                searched.results = true
            }
        }
    }
    return { cards: cards, searched: searched }
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
