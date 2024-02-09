import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <div className="contact">
                <img src="./assets/call.png" alt="" />
                <img src="./assets/whatsapp.png" alt="" />
                <img src="./assets/instagram.png" alt="" />
                <img src="./assets/waze.png" alt="" />
            </div>
            <div className="rights">
            <span>© All Rights Reserved to Gal Vitrak</span>
            </div>
			
        </div>
    );
}

export default Footer;
