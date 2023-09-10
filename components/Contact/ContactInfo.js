import React from 'react';
import * as Icon from 'react-feather';

const ContactInfo = () => {
    return (
        <>
            <div className="contact-info-area ptb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="contact-info-box">
                                <div className="icon">
                                    <Icon.Mail />
                                </div>
                                <h3>Mail Here</h3>
                                <p><a href="mailto:admin@startp.com">Info@boostingbd.com</a></p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="contact-info-box">
                                <div className="icon">
                                    <Icon.MapPin />
                                </div>
                                <h3>Visit Here</h3>
                                <p>G-9 Shahjadpur Dhaka-1219 Bangladesh <br></br>
                                    Office Time 11 PM-5Pm (UTC+6)</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="contact-info-box">
                                <div className="icon">
                                    <Icon.Phone />
                                </div>
                                <h3>Call Here</h3>
                                <p><a href="tel:+8801749-935515">+8801749-935515</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactInfo;  