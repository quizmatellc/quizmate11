import styled from "styled-components";

const Logo = styled.img`
  position: absolute;
  left: 20px;
  top: 40px;
  width: 56px;
  aspect-ratio: 1;

  @media only screen and (max-width: 900px) {
    padding-bottom: 20px;
    position: unset;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  line-height: 42.56px;
  color: #fafafa;
  text-align: center;

  @media only screen and (max-width: 767px) {
    font-size: 22px;
    line-height: normal;
  }
`;

const TitleSpan = styled.span`
  background-color: transparent;
  background-image: linear-gradient(114.27deg, #9d69ff 23.89%, #3e6eff 104.11%);
  background-size: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Icon = styled.img`
  display: inline;
`;

// const Description = styled.p`
//   font-size: 22px;
//   font-weight: 400;
//   line-height: 29.26px;
//   text-align: center;
//   color: #fafafa;

//   @media only screen and (max-width: 767px) {
//     font-size: 16px;
//   }
// `;

const PageHeading = () => {
  return (
    <>
      <Logo src={"/logo.png"} alt="Quizmate" />
      <Title>
        Study Smarter With <TitleSpan>Solvix</TitleSpan>{" "}
        <Icon src={"/hand.png"} alt="Hand" />
      </Title>
      {/* <Description>Instant answers for all assignments</Description> */}
    </>
  );
};

export default PageHeading;
