import 'dart:async';

import 'package:app/domain/usecases/market/get_market_list_usecase.dart';

import '../../../core/stores/error/error_store.dart';
import '../../../core/stores/market/market_store.dart';
import '../../../di/service_locator.dart';

class StoreModule {
  static Future<void> configureStoreModuleInjection() async {
    // factories:---------------------------------------------------------------
    getIt.registerFactory(() => ErrorStore());

    // stores:------------------------------------------------------------------
    getIt.registerSingleton<MarketStore>(
      MarketStore(
        getIt<GetMarketListUseCase>(),
        getIt<ErrorStore>(),
      ),
    );

  }
}
