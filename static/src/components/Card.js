import React, { Component } from 'react'
import Cast from './Cast'

class Card extends Component {
    state = {
        expanded: true,
        autocompressed: false
    }

    collapseCard = () => {
        this.setState({
            ...this.state,
            expanded: !this.state.expanded
        })
    }

    componentDidUpdate() {
        if (window.innerWidth < 600 && this.state.expanded && !this.state.autocompressed) {
            this.setState({
                expanded: false,
                autocompressed: true
            })
        }
    }

    render() {
        let display = {
            style: this.state.expanded ? "scale-trasition" : "scale-transition scale-out collapsedboard",
            button: this.state.expanded ? "unfold_more" : "unfold_less",
        }
        let collapsedName = !this.state.expanded ? <h6 className="show-on-medium-and-up">{this.props.card.movieinfo.title}</h6> : ""

        return (
            <div className="cardresult row">
                <a href="#!" className="btn btn-small waves-effect waves-light red left card-button" onClick={() => { this.props.removeCard(this.props.card.id) }}><i className="material-icons tiny">clear</i></a>
                <a href="#!" className={"btn btn-small waves-effect waves-light amber left card-button " + ((!this.state.expanded && this.props.searched.results) ? "pulse" : "")} onClick={this.collapseCard}><i className="material-icons tiny">{display.button}</i></a>
                <div className="center valign-wrapper">
                    {collapsedName}
                </div>
                <div className={display.style}>
                    <Cast movieinfo={this.props.card.movieinfo} searched={this.props.searched} />
                </div>
            </div>
        )
    }
}

export default Card
