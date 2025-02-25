class Endpoints {
  Endpoints._();

  // base url
  static const String baseUrl = "http://localhost:5200";

  // receiveTimeout
  static const int receiveTimeout = 15000;

  // connectTimeout
  static const int connectionTimeout = 30000;

  //
  static const String getMarkets = baseUrl + "/api/v1/market/list";


}