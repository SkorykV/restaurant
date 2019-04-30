import React from 'react'

import { sliderC } from '../../constants'
import {Slider} from "../slider/Slider";


export const MainPage = () => {
    return (
        <div>
            <Slider slides={sliderC.slides}/>
        </div>
    )
};
