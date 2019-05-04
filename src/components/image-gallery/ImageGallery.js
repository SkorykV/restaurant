import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {PreviewItem} from "./PreviewItem";

export class ImageGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            left: 0,
        };

        this.nextImage = this.nextImage.bind(this);
        this.prevImage = this.prevImage.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.images !== prevProps.images) {
            this.setState({
                selected: 0,
                left: 0,
            });
        }
    }

    prevImage() {
        this.setState((prevState) => {
            if(prevState.left === 0) {
                return;
            }
            return {
                left: prevState.left - 1
            }
        })
    }

    nextImage() {
        this.setState((prevState) => {
            if(prevState.left >= this.props.images.length - 3) {
                return;
            }
            return {
                left: prevState.left + 1
            }
        })
    }

    handleImageSelected(index) {
        this.setState({
            selected: index,
        })
    }

    render() {
        const { selected, left } = this.state;

        const translation = -left*(30 + 2.5);

        return (
            <div className="image-gallery">
                <div className="selected-image-container">
                    <div className="selected-image" style={{backgroundImage: `url(${this.props.images[selected].large})`}}>
                    </div>
                </div>

                <div className="preview-bar">
                    <div className="items-container" style={{transform: `translateX(${translation}%)`}}>
                        {
                            this.props.images.map(
                                (image, i) => {
                                    return (
                                        <PreviewItem
                                            key={image.small}
                                            url={image.small}
                                            selected={i === selected}
                                            onClick={() => this.handleImageSelected(i)}
                                        />
                                    )
                                }

                            )
                        }
                    </div>
                    <span className="arrow prev-arrow" onClick={this.prevImage} />
                    <span className="arrow next-arrow" onClick={this.nextImage} />
                </div>

            </div>
        )
    }
}


ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        small: PropTypes.string.isRequired,
        large: PropTypes.string.isRequired,
    }))
};

ImageGallery.defaultProps = {
    images: [],
};
