import React from 'react';
import {ImageGallery} from "../image-gallery";
import {galleryC} from "../../constants";


export const MainPageContent = () => {
    return (
        <div className="about-restaurant">
            <h2>Справжній ресторан грузинської кухні</h2>
            <p className="item-description">
                Запорошуємо Вас в гастрономічну подорож до Грузії.
            </p>
            <p className="item-description">
                У нас в ресторані Ви зможете відчути неперевершений смак справжнього грузинського хачапурі,
                насолодитися поєднанням смаку вишуканого грузинського вина і ідеально приготованого м'яса, а також спробувати інші національні страви Грузії.
            </p>
            <p className="item-description">
                Завдяки автентичному дизайну приміщення Ви зможете відпочити так, як це роблять справжні грузини!
            </p>
            <ImageGallery images={galleryC.images}/>
        </div>
    )
};
