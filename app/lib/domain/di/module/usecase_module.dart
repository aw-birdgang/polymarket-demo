import 'dart:async';

import 'package:app/domain/usecases/market/get_market_list_usecase.dart';

import '../../../di/service_locator.dart';
import '../../repository/market/market_repository.dart';


class UseCaseModule {
  static Future<void> configureUseCaseModuleInjection() async {

    // market:--------------------------------------------------------------------
    getIt.registerSingleton<GetMarketListUseCase>(
      GetMarketListUseCase(getIt<MarketRepository>()),
    );

  }
}
