
export class ResponseManager {
  static success(res: any, data: any, message = 'Success', status = 200) {
    return res.status(status).json({ success: true, message, data });
  }

  static error(res: any, error: any, status = 400) {
    return res.status(status).json({
      success: false,
      message: error.message || 'An error occurred',
    });
  }
  static validationError(res: any, error: any, status = 400) {
    return res.status(status).json({
      success: false,
      validationErrors: error,
    });
  }
}
