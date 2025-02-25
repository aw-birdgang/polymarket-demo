import 'dart:async';

import '../../../../core/data/network/dio/dio_client.dart';
import '../../../../domain/entry/market/market_list.dart';
import '../../constants/endpoints.dart';
import '../../rest_client.dart';

class MarketApi {
  // dio instance
  final DioClient _dioClient;

  // rest-client instance
  final RestClient _restClient;

  // injecting dio instance
  MarketApi(this._dioClient, this._restClient);

  Future<MarketList> getMarkets() async {
    try {
      final res = await _dioClient.dio.get(Endpoints.getMarkets);
      return MarketList.fromJson(res.data);
    } catch (e) {
      print(e.toString());
      throw e;
    }
  }

/// sample api call with default rest client
//   Future<FaqList> getFaqs() async {
//     try {
//       final res = await _restClient.get(Endpoints.getFaqs);
//       return FaqList.fromJson(res.data);
//     } catch (e) {
//       print(e.toString());
//       throw e;
//     }
//   }
}