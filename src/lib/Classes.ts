abstract class response {
  success: boolean;
  constructor(success: boolean) {
    this.success = success;
  }
  changeStats(success: boolean) {
    this.success = success;
  }
}
class msgResponse extends response {
  message: string;
  constructor(success: boolean, message: string) {
    super(success);
    this.message = message;
  }
  changeMessage(message: string) {
    this.message = message;
  }
}

class jsonResponse extends response {
  data: object;
  constructor(success: boolean, data: object) {
    super(success);
    this.data = data;
  }
  changeData(data: object) {
    this.data = data;
  }
}

export { jsonResponse };
export { msgResponse };
