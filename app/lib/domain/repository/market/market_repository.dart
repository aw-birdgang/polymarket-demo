import 'dart:async';

import '../../entry/market/market.dart';
import '../../entry/market/market_list.dart';

abstract class CommentRepository {
  Future<MarketList> getMarkets();
  Future<List<Market>> findMarketById(int id);
  Future<int> insert(Market market);
  Future<int> update(Market market);
  Future<int> delete(Market market);
}
