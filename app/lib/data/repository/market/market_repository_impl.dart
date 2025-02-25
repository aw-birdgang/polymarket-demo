import 'dart:async';

import 'package:logger/logger.dart';
import 'package:sembast/sembast.dart';

import '../../../di/service_locator.dart';
import '../../../domain/entry/market/market.dart';
import '../../../domain/entry/market/market_list.dart';
import '../../../domain/repository/market/market_repository.dart';
import '../../local/constants/db_constants.dart';
import '../../local/datasources/market/market_datasource.dart';
import '../../network/apis/markets/market_api.dart';

class MarketRepositoryImpl extends MarketRepository {

  final logger = getIt<Logger>();

  // data source object
  final MarketDataSource _marketDataSource;

  // api objects
  final MarketApi _marketApi;

  // constructor
  MarketRepositoryImpl(this._marketApi, this._marketDataSource);

  // Market: ---------------------------------------------------------------------
  @override
  Future<MarketList> getMarkets() async {
    return await _marketApi.getMarkets().then((marketApi) {
      marketApi.markets?.forEach((market) {
        logger.d('getMarkets > market.question :: ' + market.question);
        _marketDataSource.insert(market);
      });
      return marketApi;
    }).catchError((error) => throw error);
  }

  @override
  Future<List<Market>> findMarketById(int id) {
    //creating filter
    List<Filter> filters = [];

    //check to see if dataLogsType is not null
    Filter dataLogTypeFilter = Filter.equals(DBConstants.FIELD_ID, id);
    filters.add(dataLogTypeFilter);

    //making db call
    return _marketDataSource
        .getAllSortedByFilter(filters: filters)
        .then((markets) => markets)
        .catchError((error) => throw error);
  }

  @override
  Future<int> insert(Market market) => _marketDataSource
      .insert(market)
      .then((id) => id)
      .catchError((error) => throw error);

  @override
  Future<int> update(Market market) => _marketDataSource
      .update(market)
      .then((id) => id)
      .catchError((error) => throw error);

  @override
  Future<int> delete(Market market) => _marketDataSource
      .delete(market)
      .then((id) => id)
      .catchError((error) => throw error);

}