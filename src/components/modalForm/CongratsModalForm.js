import React from 'react';
import {ModalForm} from "./ModalForm";

export const CongratsModalForm = ({show, onClose}) => {
    return (
        <ModalForm
            title={"Авторизація"}
            show={show}
            onClose={onClose}
            onSubmit={onClose}
        >
            <h3>Вітаємо, Ваше бронювання додано успішно. Наш оператор зв'яжеться за Вами за декілька хвилин</h3>

        </ModalForm>
    )
};
