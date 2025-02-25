import 'package:sembast/sembast.dart';

import '../../../../core/data/local/sembast/sembast_client.dart';
import '../../../../domain/entry/market/market.dart';
import '../../../../domain/entry/market/market_list.dart';
import '../../constants/db_constants.dart';

class MarketDataSource {
  final _marketStore = intMapStoreFactory.store(DBConstants.MARKET);

  final SembastClient _sembastClient;

  MarketDataSource(this._sembastClient);

  // DB functions:--------------------------------------------------------------
  Future<int> insert(Market market) async {
    return await _marketStore.add(_sembastClient.database, market.toJson());
  }

  Future<int> count() async {
    return await _marketStore.count(_sembastClient.database);
  }

  Future<List<Market>> getAllSortedByFilter({List<Filter>? filters}) async {
    final finder = Finder(
        filter: filters != null ? Filter.and(filters) : null,
        sortOrders: [SortOrder(DBConstants.FIELD_ID)]);

    final recordSnapshots = await _marketStore.find(
      _sembastClient.database,
      finder: finder,
    );

    return recordSnapshots.map((snapshot) {
      final market = Market.fromJson(snapshot.value);
      market.id = snapshot.key as String;
      return market;
    }).toList();
  }


  Future<int> update(Market market) async {
    final finder = Finder(filter: Filter.byKey(market.id));
    return await _marketStore.update(
      _sembastClient.database,
      market.toJson(),
      finder: finder,
    );
  }

  Future<int> delete(Market market) async {
    final finder = Finder(filter: Filter.byKey(market.id));
    return await _marketStore.delete(
      _sembastClient.database,
      finder: finder,
    );
  }

  Future deleteAll() async {
    await _marketStore.drop(
      _sembastClient.database,
    );
  }

}
