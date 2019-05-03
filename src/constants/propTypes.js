import PropTypes from "prop-types";

export const sizeShape = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export const positionShape = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

export const timeShape = {
    h: PropTypes.oneOf([...Array(24)].map((_, i) => i)),
    m: PropTypes.oneOf([...Array(60)].map((_, i) => i)),
};

export const userShape = {
    id: PropTypes.string.isRequired,
    username: PropTypes.string,
};

