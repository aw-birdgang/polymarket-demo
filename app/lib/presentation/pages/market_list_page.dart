import 'package:another_flushbar/flushbar_helper.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';

import '../../core/stores/market/market_store.dart';
import '../../core/widgets/progress_indicator_widget.dart';
import '../../di/service_locator.dart';
import '../../utils/locale/app_localization.dart';

class MarketListPage extends StatefulWidget {
  @override
  _MarketListPageState createState() => _MarketListPageState();
}

class _MarketListPageState extends State<MarketListPage> {

  //stores:---------------------------------------------------------------------
  final MarketStore _marketStore = getIt<MarketStore>();

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // check to see if already called api
    if (!_marketStore.loading) {
      _marketStore.getMarkets();
    }
  }

  @override
  Widget build(BuildContext context) {
    return _buildBody();
  }

  // body methods:--------------------------------------------------------------
  Widget _buildBody() {
    return Scaffold(   // 🔥 수정: Scaffold 추가
      body: Stack(
        children: <Widget>[
          _handleErrorMessage(),
          _buildMainContent(),
        ],
      ),
    );
  }


  Widget _buildMainContent() {
    return Observer(
      builder: (context) {
        return _marketStore.loading
            ? CustomProgressIndicatorWidget()
            : _buildListView();
      },
    );
  }

  Widget _buildListView() {
    return _marketStore.marketList != null
        ? ListView.separated(
      itemCount: _marketStore.marketList!.markets!.length,
      separatorBuilder: (context, position) {
        return Divider();
      },
      itemBuilder: (context, position) {
        return _buildListItem(position);
      },
    ) : Center(
      child: Text(AppLocalizations.of(context).translate('message_not_found_data'),),
    );
  }

  Widget _buildListItem(int position) {
    return ListTile(
      dense: true,
      leading: Icon(Icons.cloud_circle),
      title: Text(
        '${_marketStore.marketList!.markets?[position].question}',
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        softWrap: false,
        style: Theme.of(context).textTheme.titleMedium,
      ),
      subtitle: Text(
        '${_marketStore.marketList!.markets?[position].endTime}',
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        softWrap: false,
      ),
    );
  }


  Widget _handleErrorMessage() {
    return Observer(
      builder: (context) {
        if (_marketStore.errorStore.errorMessage.isNotEmpty) {
          return _showErrorMessage(_marketStore.errorStore.errorMessage);
        }
        return SizedBox.shrink();
      },
    );
  }

  // General Methods:-----------------------------------------------------------
  _showErrorMessage(String message) {
    Future.delayed(Duration(milliseconds: 0), () {
      if (message.isNotEmpty) {
        FlushbarHelper.createError(
          message: message,
          title: AppLocalizations.of(context).translate('home_tv_error'),
          duration: Duration(seconds: 3),
        )..show(context);
      }
    });
    return SizedBox.shrink();
  }

}