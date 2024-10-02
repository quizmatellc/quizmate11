import styled from "styled-components";
import { Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
// import AnimateHeight from "react-animate-height";

const Wrapper = styled.div`
  width: 100%;
  background-color: #0d0920;
  min-height: 100vh;
`;

const InnerWrapper = styled.div`
  max-width: 625px;
  width: 100%;
  margin: 0 auto;
`;

const InnerSection = styled.div`
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 90px;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
`;

// const ExpandCollapseText = styled.div`
//   color: #64748b;
//   font-size: 15px;
//   font-weight: 400;
//   line-height: 20px;
//   padding-bottom: 10px;
//   text-align: right;
//   cursor: pointer;
// `;

const AnswerWrapper = styled.div`
  padding: 20px 10px;
  border-radius: 20px;
  border: 1px solid #9d69ff;
`;

const AnswerText = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  text-align: left;
  color: #94a3b8;

  @media only screen and (max-width: 450px) {
    overflow-x: scroll;
  }
`;

const GradientButton = styled(Button)`
  background: linear-gradient(114.27deg, #9d69ff 23.89%, #3e6eff 104.11%);
  color: #fff;
  border-radius: 15px;
  width: 130px;
  height: 47px;
  border: none; // Removes the default border
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;

  & .ant-btn-primary,
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus {
    background: linear-gradient(
      114.27deg,
      #9d69ff 23.89%,
      #3e6eff 104.11%
    ) !important;
    border: none !important;
  }

  & .ant-btn-primary:disabled {
    color: #fff;
    opacity: 0.5;
  }
`;

const Answer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [height, setHeight] = useState(150);

  useEffect(() => {
    if (!location?.state) {
      navigate("/");
      message.error("Submit a question here");
    }
  }, [location?.state, navigate]);

  return (
    <Wrapper>
      <InnerWrapper>
        <InnerSection>
          <TopWrapper>
            <PageHeading />
          </TopWrapper>

          <div>
            {/* <ExpandCollapseText
              onClick={() => setHeight(height === 150 ? "auto" : 150)}
            >
              {height === 150 ? " Expand" : "Collapse"}
            </ExpandCollapseText> */}

            {/* <AnimateHeight height={height}> */}
            <AnswerWrapper>
              <AnswerText style={{ whiteSpace: "pre-wrap" }}>
                {/* Answer:{" "} */}
                {location?.state?.questionType === "misc" ? (
                  location?.state?.solution
                ) : location?.state?.questionType === "math" ? (
                  <Latex>{location?.state?.solution}</Latex>
                ) : (
                  ""
                )}
              </AnswerText>
            </AnswerWrapper>
            <ButtonWrapper>
              <GradientButton
                type="primary"
                htmlType="submit"
                onClick={() => {
                  navigate("/");
                }}
              >
                Done
              </GradientButton>
            </ButtonWrapper>
            {/* </AnimateHeight> */}
          </div>
        </InnerSection>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Answer;
