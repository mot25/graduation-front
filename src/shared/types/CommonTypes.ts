declare namespace CommonTypes {
  enum CodeResponse {
    ErrorCode,
    SuccessCode
  }

  interface ResponseData<T> {
    code: CodeResponse;
    data: T;
  }

  interface defaultResponseData {
    code: CodeResponse;
    data: string;
  }

  type ResponseDefaultSuccess = ResponseData<defaultResponseData>;

  interface FileImagesTypes {
    uri: string;
    type: string;
    name: string;

    fileName?: string;
    base64?: string;
    bitrate?: number;
    duration?: number;
    fileSize?: number;
    width?: number;
    originalPath?: string;
    id?: string;
    height?: number;
    timestamp?: string;
  }
}
