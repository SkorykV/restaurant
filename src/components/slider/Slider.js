import React, { Component } from 'react'
import PropTypes from "prop-types";

import { sliderC } from "../../constants";

import {Slide} from "./Slide";


export class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prev: props.slides.length-1,
            active: 0,
            next: props.slides.length > 1 ? 1 : 0,
            animating: false,
        };
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }

    componentDidMount() {
        this.startNextSlideWaitingAnimation();
    }

    componentWillUnmount() {
        this.stopNextSlideWaitingAnimation();
        this.stopSlideChangeAnimation();
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.animating && this.state.animating) {
            this.stopNextSlideWaitingAnimation();
            this.startSlideChangeAnimation();
        }
        if(prevState.animating && !this.state.animating) {
            this.startNextSlideWaitingAnimation();
        }
    }

    startNextSlideWaitingAnimation() {
        this.nextSlideTimer = setTimeout(() => {
            this.nextSlide();
        }, sliderC.pause)
    }

    stopNextSlideWaitingAnimation() {
        clearTimeout(this.nextSlideTimer);
        this.nextSlideTimer = undefined;
    }

    startSlideChangeAnimation() {
        this.slideChangeTimer = setTimeout(() => {
            this.setState({animating: false});
        }, sliderC.animationTime)
    }

    stopSlideChangeAnimation() {
        clearTimeout(this.slideChangeTimer);
        this.slideChangeTimer = undefined;
    }

    nextSlide() {
        if(!this.state.animating) {
            this.setState((prevState, props) => {
                const prev = prevState.active;
                const active = prevState.next;
                const next = prevState.next < props.slides.length - 1 ? prevState.next + 1 : 0;
                return {
                    prev,
                    active,
                    next,
                    animating: true,
                }
            });
        }
    }

    prevSlide() {
        if(!this.state.animating) {
            this.setState((prevState, props) => {
                const active = prevState.prev;
                const next = prevState.active;
                const prev = prevState.prev > 0 ? prevState.prev - 1 : props.slides.length - 1;
                return {
                    prev,
                    active,
                    next,
                    animating: true,
                }
            })
        }
    }

    render() {
        return (
            <section className="slider-section">
                <div className="slider-content">
                    {
                        this.props.slides.map(
                            (slide, index) => (
                                <Slide
                                    key={slide.url}
                                    url={require(`../../images/slider/${slide.url}`)}
                                    title={slide.title}
                                    active={index === this.state.active}
                                    next={index === this.state.next}
                                    prev={index === this.state.prev}
                                />
                            )
                        )
                    }
                </div>
                <span className="arrow prev-arrow" onClick={this.prevSlide} >&#8249;</span>
                <span className="arrow next-arrow" onClick={this.nextSlide} >&#8250;</span>
            </section>
        )
    }
}

Slider.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
};

Slider.defaultProps = {
    slides: []
};
