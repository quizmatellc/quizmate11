import { useState } from "react";
import { MemberstackProtected, SignInModal } from "@memberstack/react";
import styled from "styled-components";
import {
  Button,
  Input,
  Segmented,
  Spin,
  Tag,
  Tooltip,
  Upload,
  message,
} from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import PageHeading from "../../components/PageHeading";
import mimeTypesMap from "../../utils/memeTypeMap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  background-color: #0d0920;
  min-height: 100vh;
  position: relative;
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

const MainWorkAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OptionWithUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const InstructionText = styled.h2`
  font-size: 16px;
  font-weight: 400;
  line-height: 21.28px;
  text-align: left;
  color: #fdfcfd;
`;

const TabWrapper = styled.div`
  & .ant-segmented {
    padding: 7px;
    background-color: #1e293bcc;
    border-radius: 20px;
  }

  & .ant-segmented .ant-segmented-thumb {
    background: linear-gradient(
      114.27deg,
      #9d69ff 23.89%,
      #3e6eff 104.11%
    ) !important;
  }

  & .ant-segmented .ant-segmented-group {
    gap: 10px;
    width: 130px;
  }

  & .ant-segmented {
    .ant-segmented-item,
    .ant-segmented-item:hover {
      background: #0f172a !important;
      border-radius: 10px;
      color: #94a3b8 !important;
      font-size: 14px;
      font-weight: 400;
      line-height: 18.62px;
      width: 50%;
    }
  }

  & .ant-segmented {
    .ant-segmented-item.ant-segmented-item-selected,
    .ant-segmented-item.ant-segmented-item-selected:hover {
      background: linear-gradient(
        114.27deg,
        #9d69ff 23.89%,
        #3e6eff 104.11%
      ) !important;
      border-radius: 10px;
      color: #fafafa !important;
      font-size: 14px;
      font-weight: 400;
      line-height: 18.62px;
      box-shadow: none;
    }
  }

  & .ant-segmented .ant-segmented-item::after {
    transition: none;
  }

  & .ant-segmented .ant-segmented-item-label {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 39px;
  }
`;

const TextAreaWrapper = styled.div``;

const TextAreaSection = styled.div`
  padding-top: 10px;
  position: relative;

  & .ant-input-outlined {
    background: transparent;
    border: 1px solid #9d69ff;
    border-radius: 20px;
    padding: 20px;
    color: #fff;
  }

  & .ant-input-outlined::placeholder {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    color: #64748b;
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
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 10px;

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

const DraggerWrapper = styled.div`
  & .ant-upload-wrapper .ant-upload-drag {
    border: none;
    background: transparent;
  }

  & .ant-upload-wrapper .ant-upload-drag .ant-upload {
    padding: 0;
  }
`;

const UploadSection = styled.div`
  min-height: 263px;
  max-height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #9d69ff;
  box-shadow: 0px 1px 2px 0px #0000000d;
  border-radius: 20px;
  cursor: pointer;
`;

const InnerUploadSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  gap: 15px;
`;

const PlaceholderImage = styled.img`
  width: fit-content;
`;

const PreviewImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 300px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 300px;
`;

const TrashWrapper = styled.div`
  width: 30px;
  aspect-ratio: 1;
  background-color: #000;
  opacity: 0.5;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const PlaceholderText = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  background-color: transparent;
  background-image: linear-gradient(114.27deg, #9d69ff 23.89%, #3e6eff 104.11%);
  background-size: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ImageButtonSubmitWrapper = styled(ButtonWrapper)`
  position: unset;
  padding-top: 10px;
  display: flex;
  justify-content: flex-start;
`;

const SpinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const AnalyzingText = styled(PlaceholderText)`
  font-size: 20px;
  font-weight: 400;
  line-height: 24.2px;
`;

const TagWrapper = styled.div`
  margin: 90px 0 10px;
  display: flex;
  justify-content: center;

  & .ant-tag {
    padding: 7px 18px;
    background: transparent;
    font-size: 17.41px;
    font-weight: 400;
    line-height: 23.15px;
    text-align: center;
    color: #fafafa;
    border-radius: 29px;
    display: flex;
    width: fit-content;
    border: 1.24px solid #3e6eff;
  }
`;

const ScreenShopHelpText = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  background-color: transparent;
  background-image: linear-gradient(114.27deg, #9d69ff 23.89%, #3e6eff 104.11%);
  background-size: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-top: 5px;
  cursor: pointer;
  width: max-content;
`;

const TooltipWrapper = styled.div`
  background-color: #1e192a;
  border-radius: 10px;
  border: 2px dashed #3e6eff;
  padding: 40px 20px;
  width: max-content;
`;

const TooltipText = styled.p`
  color: #fff;
  font-size: 14px;
`;

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [questionFormat, setQuestionFormat] = useState("");
  const [textQuestion, setTextQuestion] = useState("");
  const [questionType, setQuestionType] = useState("Misc");
  const { Dragger } = Upload;
  const { TextArea } = Input;

  const validateUpload = (file) => {
    const accept = ".jpg,.jpeg,.png";
    const acceptedMimeTypes = accept
      ? accept.split(",").map((ext) => mimeTypesMap[ext.trim()])
      : [];

    const isAcceptedFormat = acceptedMimeTypes.length
      ? acceptedMimeTypes.includes(file.type)
      : true;

    if (!isAcceptedFormat) {
      message.error(
        `File type not accepted, please upload ${".jpg,.jpeg,.png"} files only.`
      );
      return false;
    }

    const maxSizeMB = 5;

    const isLtMaxSize = maxSizeMB ? file.size / 1024 / 1024 < maxSizeMB : true;
    if (!isLtMaxSize) {
      message.error(`File size exceeds ${maxSizeMB}MB.`);
      return false;
    }

    return true;
  };

  const appendFile = (file) => {
    setFileList([file]);

    // Encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
      // Use a regex to remove data url part
      const base64String = reader.result;
      // .replace("data:", "")
      // .replace(/^.+,/, "");

      setImagePreviewUrl(base64String);
    };
    reader.readAsDataURL(file);
  };

  const props = {
    name: "file",
    multiple: false,
    // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    // onChange(info) {
    //   const updatedFileList = info.fileList;
    //   const { status } = info.file;
    //   if (status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === "done") {
    //     console.log("done");
    //     message.success(`${info.file.name} file uploaded successfully.`);
    //     setFileList(updatedFileList);
    //   } else if (status === "error") {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files[0]);

      const status = validateUpload(e.dataTransfer.files[0]);

      if (status) {
        appendFile(e.dataTransfer.files[0]);
      }
    },
  };

  const makeRequest = async (info) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/analyze/question`,
        info
      );

      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        message.error(`There is an error: ${error?.response?.data?.message}`);
      } else {
        message.error("There is an error.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <MemberstackProtected
      fallback={<div >Loading...</div>}
      // onUnauthorized={() => {
      //   window.location.href = "https://www.quizmate.gg/access-denied";
      // }}
      onUnauthorized={<SignInModal />}
    >
      <Wrapper>
        <InnerWrapper>
          <InnerSection>
            {loading ? (
              <>
                <SpinWrapper>
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 100, color: "#9D69FF" }}
                        spin
                      />
                    }
                  />
                  <AnalyzingText>
                    Analyzing your{" "}
                    {questionFormat === "image" ? "image" : "text"}
                  </AnalyzingText>
                </SpinWrapper>
                <TagWrapper>
                  <Tag>here come your answers 👍</Tag>
                </TagWrapper>
              </>
            ) : (
              <>
                <TopWrapper>
                  <PageHeading />
                </TopWrapper>
                <MainWorkAreaWrapper>
                  <OptionWithUploadWrapper>
                    <OptionWrapper>
                      <InstructionText>
                        Scan questions from an image
                      </InstructionText>
                      <TabWrapper>
                        <Segmented
                          options={["Misc", "Math"]}
                          onChange={(value) => {
                            setQuestionType(value);
                          }}
                          value={questionType}
                        />
                      </TabWrapper>
                    </OptionWrapper>

                    <DraggerWrapper>
                      <Dragger
                        {...props}
                        disabled={textQuestion}
                        maxCount={1}
                        showUploadList={false}
                        accept="capture=camera;image/*"
                        fileList={fileList}
                        customRequest={({ onSuccess, file }) => {
                          appendFile(file);
                          onSuccess("ok");
                        }}
                        beforeUpload={(file) => {
                          return validateUpload(file);
                        }}
                      >
                        <UploadSection>
                          <InnerUploadSection>
                            {imagePreviewUrl ? (
                              <PreviewImageWrapper>
                                <PreviewImage
                                  src={imagePreviewUrl}
                                  alt="Preview"
                                />
                                <TrashWrapper
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFileList([]);
                                    setImagePreviewUrl("");
                                  }}
                                >
                                  <DeleteOutlined
                                    style={{ fontSize: "15px", color: "red" }}
                                  />
                                </TrashWrapper>
                              </PreviewImageWrapper>
                            ) : (
                              <>
                                <PlaceholderImage
                                  src={"/placeholder.svg"}
                                  alt="Placeholder"
                                />
                                <PlaceholderText>
                                  Drag image or click here to upload
                                </PlaceholderText>
                              </>
                            )}
                          </InnerUploadSection>
                        </UploadSection>
                      </Dragger>
                      <Tooltip
                        color="#0e0b1c"
                        style={{ maxWidth: "100%" }}
                        trigger={"click"}
                        title={
                          <TooltipWrapper>
                            <TooltipText>
                              Mac - ⌘ + Shift + 4 to take a screenshot
                            </TooltipText>
                            <TooltipText style={{ paddingTop: "20px" }}>
                              Windows - Win + Shift + S to take a screenshot
                            </TooltipText>
                          </TooltipWrapper>
                        }
                        placement="bottomLeft"
                        arrow={false}
                      >
                        <ScreenShopHelpText>
                          How to take a screenshot?
                        </ScreenShopHelpText>
                      </Tooltip>
                      <ImageButtonSubmitWrapper>
                        <GradientButton
                          type="primary"
                          htmlType="submit"
                          disabled={!imagePreviewUrl}
                          onClick={async () => {
                            setQuestionFormat("image");

                            const formData = new FormData();

                            // const info = {
                            //   questionType: questionType?.toLowerCase(),
                            //   questionFormat: "image",
                            //   questionText: textQuestion,
                            // };

                            formData.append(
                              "questionType",
                              questionType?.toLowerCase()
                            );
                            formData.append("questionFormat", "image");
                            formData.append("imageFile", fileList[0]);

                            const response = await makeRequest(formData);

                            if (response?.status === 200) {
                              setTextQuestion("");
                              setQuestionFormat("");
                              navigate("/answer", { state: response?.data });
                            }
                          }}
                        >
                          Submit
                        </GradientButton>
                      </ImageButtonSubmitWrapper>
                    </DraggerWrapper>
                  </OptionWithUploadWrapper>

                  <TextAreaWrapper>
                    <InstructionText>Or type..</InstructionText>
                    <TextAreaSection>
                      <TextArea
                        disabled={imagePreviewUrl}
                        value={textQuestion}
                        style={{ resize: "none" }}
                        rows={6}
                        placeholder="Type your question here"
                        onChange={(e) => {
                          setTextQuestion(e.target.value);
                        }}
                        //   autoSize
                      />
                      <ButtonWrapper>
                        <GradientButton
                          loading={loading && questionFormat === "text"}
                          type="primary"
                          htmlType="submit"
                          disabled={!textQuestion?.length > 0}
                          onClick={async () => {
                            setQuestionFormat("text");

                            const info = {
                              questionType: questionType?.toLowerCase(),
                              questionFormat: "text",
                              questionText: textQuestion,
                            };

                            const response = await makeRequest(info);

                            if (response?.status === 200) {
                              setTextQuestion("");
                              setQuestionFormat("");
                              navigate("/answer", { state: response?.data });
                            }
                          }}
                        >
                          Solve
                        </GradientButton>
                      </ButtonWrapper>
                    </TextAreaSection>
                  </TextAreaWrapper>
                </MainWorkAreaWrapper>
              </>
            )}
          </InnerSection>
        </InnerWrapper>
      </Wrapper>
    </MemberstackProtected>
  );
};

export default Home;
