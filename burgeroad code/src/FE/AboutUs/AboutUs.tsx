import {
  buttonStyle,
  cardBoldParaStyle,
  cardStyle,
  cardTitleStyle,
  cardWrapperStyle,
  div1Style,
  div2Style,
  imageStyle,
  imageWrapperStyle,
  linkStyle,
  aboutStyle,
} from "./AboutUs.style";
import { useHistory } from "react-router-dom";
import { getUserFromLocalStorage } from "../Login/UserManager";

const AboutUS = () => {
  const history = useHistory();
  const user = getUserFromLocalStorage();
  const handleClickReturnHomePage = () => {
    if (user) {
      history.push(`user/${user.id}`);
    } else {
      history.push(`/`);
    }
  };

  return (
    <div style={aboutStyle}>
      <div style={div1Style}>
        <div style={div2Style}>
          <button
            style={buttonStyle}
            onClick={() => handleClickReturnHomePage()}
          >
            Return to Homepage
          </button>
        </div>
        <div style={cardWrapperStyle}>
          <Card
            name={"Ori Goldenberg"}
            position={"Support manager and FullStack"}
            linkedIn={"linkedin.com/in/ori-goldenberg-0b3950192"}
            image={
              "https://media-exp2.licdn.com/dms/image/C5603AQEbjO_I0rRCEQ/profile-displayphoto-shrink_800_800/0/1639328526832?e=1661990400&v=beta&t=NWp5MwNxMrQyLMbSvgMutFDz0bU7VHu97Uk7cwpjK2k"
            }
          />
          <Card
            name={"Daniel Ashorov"}
            position={"Full Stack and Android Developer"}
            linkedIn={"linkedin.com/in/daniel-ashorov-354534221/"}
            image={
              "https://media-exp2.licdn.com/dms/image/C4D03AQHjws2jBhSaAg/profile-displayphoto-shrink_800_800/0/1632478462814?e=1661990400&v=beta&t=uXz_6XTaBKKi__KZAOOQ7URc3P2IVjpTT038GqxnH0s"
            }
          />
          <Card
            name={"Ohad Edry"}
            position={"QA Engineer and Fullstack developer"}
            linkedIn={"linkedin.com/in/ohad-edry/"}
            image={
              "https://media-exp2.licdn.com/dms/image/C4D03AQGOWX3c8IytZg/profile-displayphoto-shrink_800_800/0/1565092316078?e=1661990400&v=beta&t=JQMs0mI5vyq3jnlCAj6dViWZvayg5nAp4m0S7oocCV0"
            }
          />
          <Card
            name={"Netanel Shimoni"}
            position={"Fullstack developer"}
            linkedIn={"linkedin.com/in/netanel-shimoni-1790331a8/"}
            image={"https://avatars.githubusercontent.com/u/57719538?v=4"}
          />
        </div>
      </div>
    </div>
  );
};

interface ICardProps {
  name: string;
  image: string;
  position: string;
  linkedIn: string;
}

const Card = ({ name, position, linkedIn, image }: ICardProps) => {
  return (
    <div style={cardStyle}>
      <div style={imageWrapperStyle}>
        <img style={imageStyle} src={image} alt="Ori Goldenberg" />
      </div>
      <div>
        <h1 style={cardTitleStyle}>{name}</h1>
        <p>
          <span style={cardBoldParaStyle}>Position:</span>
          &nbsp; &nbsp;{position}
        </p>
        <p>
          <span style={cardBoldParaStyle}>Contact me:</span>
          &nbsp; &nbsp;
          <a
            style={linkStyle}
            href={`https://www.${linkedIn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkedIn}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutUS;
