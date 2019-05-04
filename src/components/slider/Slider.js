import React, { Component } from 'react'
import PropTypes from "prop-types";
import {withRouter} from "react-router";

import {Slide} from "./Slide";
import {sliderC} from "../../constants/slider";



export class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prev: props.slides.length > 0 ? props.slides.length-1 : 0,
            active: 0,
            next: props.slides.length > 1 ? 1 : 0,
            animating: false,
            animationType: null,
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
        if(prevProps !== this.props) {
            //reset slider
            this.stopSlideChangeAnimation();
            this.stopNextSlideWaitingAnimation();

            this.setState((prevState, props) => {
                return {
                    prev: props.slides.length > 0 ? props.slides.length-1 : 0,
                    active: 0,
                    next: props.slides.length > 1 ? 1 : 0,
                    animating: false,
                    animationType: null,
                }
            }, () => {console.log('reseted')})
        }
        else {
            if(this.state.animating && !prevState.animating) {
                this.stopNextSlideWaitingAnimation();
                this.startSlideChangeAnimation();
            }
            else if(!this.state.animating && this.nextSlideTimer === undefined) {
                this.startNextSlideWaitingAnimation();
            }
        }
    }

    startNextSlideWaitingAnimation() {
        this.nextSlideTimer = setTimeout(() => {
            this.nextSlide();
        }, this.props.pause)
    }

    stopNextSlideWaitingAnimation() {
        clearTimeout(this.nextSlideTimer);
        this.nextSlideTimer = undefined;
    }

    startSlideChangeAnimation() {
        if(this.props.slides.length > 2) {
            this.slideChangeTimer = setTimeout(() => {
                this.setState({animating: false, animationType: null});
            }, sliderC.animationTime)
        }
        else {
            this.setState({animating: false, animationType: null});
        }
    }

    stopSlideChangeAnimation() {
        clearTimeout(this.slideChangeTimer);
        this.slideChangeTimer = undefined;
    }

    nextSlide() {
            this.setState((prevState, props) => {
                if(!prevState.animating) {
                    console.log('nextSlide', prevState.active, prevState.next);
                    const prev = prevState.active;
                    const active = prevState.next;
                    const next = prevState.next < props.slides.length - 1 ? prevState.next + 1 : 0;
                    return {
                        prev,
                        active,
                        next,
                        animating: true,
                        animationType: 'next',
                    }
                }
                else {
                    return undefined;
                }
            });
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
                    animationType: 'prev',
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
                            (slide, index) => {
                                let prev = index === this.state.prev;
                                const active = index === this.state.active;
                                let next = index === this.state.next;
                                if(next && prev) {
                                    next = prev = false;
                                }
                                let visible = false;
                                if(active) {
                                    visible = true;
                                }
                                else if(this.state.animationType === 'prev' && next) {
                                    visible = true;
                                }
                                else if(this.state.animationType === 'next' && prev) {
                                    visible = true;
                                }

                                return (
                                    <Slide
                                        key={slide.url}
                                        url={require(`../../images/slider/${slide.url}`)}
                                        title={slide.title}
                                        active={active}
                                        next={next}
                                        prev={prev}
                                        visible={visible}
                                        onClick={() => this.props.history.push(`/events/${slide.eventId}`)}
                                    />
                                )
                            }
                        )
                    }
                </div>
                <span className="arrow prev-arrow" onClick={this.prevSlide} >&#8249;</span>
                <span className="arrow next-arrow" onClick={this.nextSlide} >&#8250;</span>
            </section>
        )
    }
}

MyComponent.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape({
        eventId: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
    pause: PropTypes.number,
};

MyComponent.defaultProps = {
    slides: [],
    pause: 5000,
};

export const Slider = withRouter(MyComponent);
