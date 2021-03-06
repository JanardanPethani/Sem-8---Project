import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <ul>
                <li><a href="https://www.facebook.com/profile.php?id=100009966555668" target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook"></i>
                </a></li>
                <li><a href="https://www.instagram.com/janardanpethani/" target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram"></i>
                </a></li>
                <li><a href="https://github.com/JanardanPethani?tab=repositories" target="_blank" rel="noreferrer">
                    <i className="fab fa-github"></i>
                </a></li>
                <li><a href="https://twitter.com/417cc73c4a4a415" target="_blank" rel="noreferrer">
                    <i className="fab fa-twitter"></i>
                </a></li>
            </ul>
            <p style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem', textShadow:'1px 1px 1px #e3e3e3' }}> Janardan Pethani </p>
        </div>
    )
}

export default Footer