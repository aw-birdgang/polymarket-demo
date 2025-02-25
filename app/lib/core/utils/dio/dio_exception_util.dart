import 'package:dio/dio.dart';

/// 🔥 Custom Exception for Ethers Errors
/// 📌 ethers.dart는 별도의 Exception 클래스를 제공하지 않음
/// 📌 커스텀 Exception을 만들어서 사용
class EthersException implements Exception {
  final String code;
  final String message;

  EthersException({required this.code, required this.message});

  @override
  String toString() => "EthersException($code): $message";
}

/// 🔥 DioExceptionUtil
/// 📌 Dio 및 ethers.dart 에러를 통합적으로 처리하기 위한 유틸리티 클래스
class DioExceptionUtil {
  /// 🚨 에러 핸들링 메서드
  /// DioException 및 EthersException을 일관된 메시지로 반환
  static String handleError(dynamic error) {
    if (error is DioException) {
      return _handleDioException(error);
    } else if (error is EthersException) {
      return _handleEthersError(error);
    } else if (error is TypeError) {
      return "TypeError: Invalid data type encountered!";
    } else {
      return "Unexpected error occurred: ${error.toString()}";
    }
  }

  /// 🔍 DioException 처리
  static String _handleDioException(DioException error) {
    switch (error.type) {
      case DioExceptionType.cancel:
        return "Request to the server was cancelled.";
      case DioExceptionType.connectionTimeout:
        return "Connection timeout with the server.";
      case DioExceptionType.sendTimeout:
        return "Send timeout in connection with the server.";
      case DioExceptionType.receiveTimeout:
        return "Receive timeout in connection with the server.";
      case DioExceptionType.badResponse:
        return _handleHttpError(error.response?.statusCode, error.response?.data);
      case DioExceptionType.unknown:
        return "Unexpected error: ${error.message}";
      default:
        return "Unknown Dio error occurred.";
    }
  }

  /// 🔍 HTTP 상태 코드에 따른 에러 메시지 처리
  static String _handleHttpError(int? statusCode, dynamic data) {
    switch (statusCode) {
      case 400:
        return "Bad request: $data";
      case 401:
        return "Unauthorized request.";
      case 403:
        return "Access forbidden.";
      case 404:
        return "Resource not found.";
      case 500:
        return "Internal server error.";
      case 502:
        return "Bad gateway.";
      case 503:
        return "Service unavailable.";
      case 504:
        return "Gateway timeout.";
      default:
        return "Received invalid status code: $statusCode";
    }
  }

  /// 🔍 EthersException 처리
  static String _handleEthersError(EthersException error) {
    if (error.code == 'UNPREDICTABLE_GAS_LIMIT') {
      return "Gas limit could not be estimated. Please check the transaction.";
    } else if (error.code == 'CALL_EXCEPTION') {
      return "Smart contract call failed. Possible revert or exception.";
    } else if (error.code == 'INSUFFICIENT_FUNDS') {
      return "Insufficient funds for the transaction.";
    } else {
      return "Ethers.js error: ${error.message}";
    }
  }
}