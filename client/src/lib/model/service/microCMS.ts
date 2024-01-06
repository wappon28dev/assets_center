import {
  sendFieldExtensionMessage,
  type Message,
  type UpdateStyleMessage,
  type PostDataMessage,
} from "microcms-field-extension-api";

export class ParentController {
  public id: string;
  public origin: string;

  constructor(public initEvent: typeof window.microcmsIframeInitEvent) {
    this.id = initEvent.data.id;
    this.origin = initEvent.origin;
  }

  private readonly postMessage = window.parent.postMessage.bind(window.parent);

  public updateStyle(style: UpdateStyleMessage["message"]): void {
    const data = {
      id: this.id,
      action: "MICROCMS_UPDATE_STYLE",
      message: style,
    } as const satisfies UpdateStyleMessage;
    this.postMessage(data, this.origin);
  }

  public postData<T>(message: Message<T>): void {
    const data = {
      id: this.id,
      action: "MICROCMS_POST_DATA",
      message,
    } as const satisfies PostDataMessage<T>;

    sendFieldExtensionMessage(data, this.origin);
  }
}
