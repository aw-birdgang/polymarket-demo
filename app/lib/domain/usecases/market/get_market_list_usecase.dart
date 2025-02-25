
import '../../../core/domain/usecase/use_case.dart';
import '../../entry/market/market_list.dart';
import '../../repository/market/market_repository.dart';

class GetMarketListUseCase extends UseCase<MarketList, void> {

  final MarketRepository _marketRepository;

  GetMarketListUseCase(this._marketRepository);

  @override
  Future<MarketList> call({required params}) {
    return _marketRepository.getMarkets();
  }
}