import 'dart:async';

import '../../../di/service_locator.dart';
import '../../../domain/repository/market/market_repository.dart';
import '../../local/datasources/market/market_datasource.dart';
import '../../network/apis/markets/market_api.dart';
import '../../repository/market/market_repository_impl.dart';

class RepositoryModule {
  static Future<void> configureRepositoryModuleInjection() async {
    // repository:--------------------------------------------------------------
    getIt.registerSingleton<MarketRepository>(MarketRepositoryImpl(
      getIt<MarketApi>(),
      getIt<MarketDataSource>(),
    ));

  }
}