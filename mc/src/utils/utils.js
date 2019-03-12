export default function matchCast(cards) {
    for (let card of cards) {
        let crewsList = cards.filter(value => value !== card).map(movie => {
            return movie.movieinfo.Cast.map(member => member.id)
        })
        for (let member of card.movieinfo.Cast) {
            let matched = crewsList.map(crew => { return crew.includes(member.id) })
            member.matched = matched.every(match => match === true)
        }
    }
    let searched = true
    return { cards: cards, searched: searched }
}
