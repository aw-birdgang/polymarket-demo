import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../domain/entry/market/market.dart';

class MarketItem extends StatelessWidget {
  final Market market;

  MarketItem({required this.market});

  @override
  Widget build(BuildContext context) {
    // 🔥 DateFormat 사용 예시
    String formattedDate = DateFormat('yyyy-MM-dd').format(market.endTime);
    // 🔥 혹은 좀 더 읽기 쉬운 포맷
    // String formattedDate = DateFormat.yMMMMd().format(market.endTime);

    return Card(
      child: ListTile(
        title: Text(market.question),
        subtitle: Text('Ends: $formattedDate'),
        trailing: Text('${market.outcome} ETH'),
        onTap: () {
          Navigator.pushNamed(context, '/market/${market.id}');
        },
      ),
    );
  }
}