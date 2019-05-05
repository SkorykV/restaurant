import React, {Component} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook} from "@fortawesome/free-solid-svg-icons";

export class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online: false,
        };

        this.checkInternetConnection = this.checkInternetConnection.bind(this);
    }

    checkInternetConnection() {
        if(window.navigator.onLine) {
            const img = new Image();
            img.onload = () => {
                this.setState({online: true});
            };
            img.onerror = () => {
                setTimeout(this.checkInternetConnection, 5000);
            };
            img.src = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png?ver=' + (new Date).getTime();
        }
        else {
            setTimeout(this.checkInternetConnection, 5000);
        }
    }

    componentDidMount() {
        this.checkInternetConnection();
    }

    render() {
        return (
            <div className="contacts-page">
                <h2>Наші контакти?</h2>
                <p>
                    <span className="icon-info icon-info-lg">
                        <FontAwesomeIcon className="icon black-icon" icon={faAddressBook} />
                        <span>+38(096)056-90-73 з мобільного</span>
                    </span>
                </p>
                <p>
                    <span className="icon-info icon-info-lg">
                        <FontAwesomeIcon className="icon black-icon" icon={faAddressBook} />
                        <span>265-04-40 - по Києву</span>
                    </span>
                </p>
                <h2>Як нас знайти?</h2>
                <p className="item-description">
                    Ресторан знаходиться в Солом'янському районі м. Києва, за адресою - вул. Кавказьська 10.
                </p>
                <div className="google-map">
                    {
                        this.state.online &&
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.4268218714096!2d30.477448815264587!3d50.43314999649308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cec01e52255f%3A0x92cca6ea91a88e36!2sSpecialized+School+%E2%84%96+115!5e0!3m2!1sen!2sua!4v1557035007576!5m2!1sen!2sua'
                            frameBorder="0" style={{border:0}} allowFullScreen />
                    }
                </div>
            </div>
        )
    }

}
